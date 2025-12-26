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

## New Project - CHECKLIST (follow in order!)

**STOP: Do NOT skip steps. Do NOT use manual estimates.**

1. [ ] Check if chain has public API (RPC, REST, etc.)
2. [ ] Create fetcher: `src/lib/data/fetchers/[chain].ts`
3. [ ] Create script: `scripts/fetch-[chain].ts`
4. [ ] Test locally: `npx tsx scripts/fetch-[chain].ts`
5. [ ] Create project file: `src/lib/data/projects/[chain].ts`
   - Use API data for A1, A2 - NO manual estimates!
6. [ ] Update index: `src/lib/data/projects/index.ts`
7. [ ] Run build: `npm run build` - MUST pass before commit
8. [ ] Create workflow: `.github/workflows/data-[chain].yml`
9. [ ] Update README.md "Supported Chains" table
10. [ ] Commit: `feat: add [Chain] as [N]th project`
11. [ ] Trigger workflow: `gh workflow run "[CHAIN]: Fetch Network Data"`
12. [ ] Verify workflow succeeds

**FORBIDDEN:**
- Creating project file before fetcher
- Using estimated values when API is available
- Committing before build passes

## Releases - CHECKLIST (follow in order!)

**STOP: Read this COMPLETELY before starting.**

When user says "neuer RC" or "Release":

1. [ ] Update README.md - add new project to "Supported Chains" table
2. [ ] Update CHANGELOG.md - add version entry with scoring table
3. [ ] Run build: `npm run build` - MUST pass
4. [ ] Run: `./scripts/release.sh <version>`

**FORBIDDEN:**
- Running release.sh before README is updated
- Running `git tag` manually
- Running `git push origin <tag>` manually
- Running `gh release create` manually

Commit messages: imperative mood, max 50 chars, e.g., `feat: add Chainlink project`

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
