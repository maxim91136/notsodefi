# CLAUDE.md

## Communication

- Be direct. Skip preamble.
- Push back if approach seems wrong.
- When uncertain, say so clearly.
- Languages: German conversation, English code/commits.

## Code Style

- TypeScript strict mode. `unknown` over `any`.
- Functional style: pure functions, immutable data.
- Precise naming: `getProjectById` not `fetchProject`, `isKillSwitchCapped` not `checkCapped`.
- Comments explain *why*, not *what*.
- Error handling: fail fast, explicit types, no silent catches.

## Project Architecture

- Stack: Next.js 15, TypeScript, Tailwind, Shadcn/UI
- Data fetchers: `/src/lib/data/fetchers/` - one per chain
- Project scores: `/src/lib/data/projects/` - one per chain
- Scoring logic: `/src/lib/utils/scoring.ts`
- GitHub Actions: Daily data fetches per chain

## Scoring Framework

- 11 criteria, 3 categories: Chain (40%), Control (40%), Fairness (20%)
- Kill-Switch (B9=0) caps total score at 2.0 - always document reasoning
- Consensus types: `pow`, `pos`, `dpos`, `npos`, `federated`, `hybrid`
- All scores must be verifiable - no estimates without sources

## Workflow

- Read existing patterns before implementing.
- For new chains: fetcher → project file → index exports → workflow → README
- Test fetchers locally before creating workflows: `npx tsx scripts/fetch-[chain].ts`
- Commit messages: imperative mood, max 50 chars, e.g., `feat: add Chainlink project`

## Releases - WICHTIG!

**IMMER `./scripts/release.sh` verwenden. NIEMALS manuell Tags erstellen!**

Ablauf für einen Release:
1. Alle Änderungen committen und pushen
2. CHANGELOG.md aktualisieren mit neuem Versions-Eintrag
3. `./scripts/release.sh <version>` ausführen (z.B. `./scripts/release.sh 0.13.0`)

Das Script macht automatisch:
- VERSION file update
- Build check
- Commit mit Changelog-Inhalt
- Push zu origin/main
- Git tag erstellen und pushen
- GitHub Release erstellen

**VERBOTEN:**
- `git tag` manuell ausführen
- `git push origin <tag>` manuell ausführen
- `gh release create` manuell ausführen

Wenn der User "neuer RC" oder "Release" sagt → CHANGELOG.md updaten, dann `./scripts/release.sh` ausführen.

## Data Integrity

- Every metric needs a source (API, on-chain, documentation)
- Gray areas get documented in comments, not silently decided
- Insider allocations: use conservative estimates, cite source
- When data unavailable: use `null`, don't guess

## Constraints

- No external dependencies without approval
- Keep functions under 30 lines
- No secrets in code - use environment variables
- Validate all API responses before using
