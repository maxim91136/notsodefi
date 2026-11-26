// Läuft nach "next build" (siehe package.json). Next.js schreibt beim statischen Export Inline-Skripte in jede Seite.
// Statt 'unsafe-inline' zu erlauben, erzeugt dieses Skript pro Seite eine Content-Security-Policy mit den SHA-256-Prüfsummen genau dieser Skripte
// und hängt sie als Regeln an out/_headers (Cloudflare Pages). Ohne Lauf dieses Skripts gibt es keine CSP (die Seite bleibt funktionsfähig, nur ungehärtet).
// Nur Standardbibliothek von Node. Maßstab: Web-Audit Dreier Labs (audit/REGELN.md), Gruppe CSP.
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, appendFileSync, existsSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const OUT = new URL("../out", import.meta.url).pathname;
const MAX_ZEILE = 2000; // Cloudflare Pages: höchstens 2000 Zeichen je Kopfzeile, höchstens 100 Regeln

function htmlDateien(ordner) {
  return readdirSync(ordner).flatMap((n) => {
    const p = join(ordner, n);
    if (statSync(p).isDirectory()) return n === "_next" ? [] : htmlDateien(p);
    return n.endsWith(".html") ? [p] : [];
  });
}

export function inlineSkripte(html) {
  const treffer = [];
  const re = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) {
    if (/type="application\/ld\+json"/.test(m[1])) continue; // Daten, kein ausführbares Skript
    treffer.push(m[2]);
  }
  return treffer;
}

export function richtlinie(skripte) {
  const hashes = [...new Set(skripte.map((s) => "'sha256-" + createHash("sha256").update(s, "utf8").digest("base64") + "'"))];
  return [
    "default-src 'none'",
    ["script-src 'self'", ...hashes].join(" "),
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "manifest-src 'self'",
    "base-uri 'self'",
    "form-action 'none'",
    "frame-ancestors 'none'",
    "object-src 'none'",
  ].join("; ");
}

export function route(rel) {
  const r = "/" + rel.replace(/\\/g, "/").replace(/\.html$/, "");
  return r === "/index" ? "/" : r;
}

function main() {
  const datei = join(OUT, "_headers");
  if (!existsSync(datei)) throw new Error("out/_headers fehlt (public/_headers wurde nicht kopiert)");
  let regeln = 0, ausgabe = "\n# Erzeugt von scripts/csp.mjs, nicht von Hand ändern\n";
  for (const f of htmlDateien(OUT).sort()) {
    const rel = relative(OUT, f);
    if (rel === "404.html" || rel === "_not-found.html") continue;
    const csp = richtlinie(inlineSkripte(readFileSync(f, "utf8")));
    const zeile = "  Content-Security-Policy: " + csp;
    if (zeile.length > MAX_ZEILE) throw new Error("CSP für " + rel + " ist " + zeile.length + " Zeichen lang (Grenze " + MAX_ZEILE + ")");
    ausgabe += route(rel) + "\n" + zeile + "\n";
    regeln++;
  }
  if (regeln > 90) throw new Error("zu viele Regeln für Cloudflare Pages: " + regeln);
  appendFileSync(datei, ausgabe);
  console.log("CSP: " + regeln + " Seitenregeln in out/_headers");
}

if (process.argv[1] && process.argv[1].endsWith("csp.mjs")) main();
