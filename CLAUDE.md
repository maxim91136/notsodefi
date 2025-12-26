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

## Releases - CRITICAL!

**ALWAYS use `./scripts/release.sh`. NEVER create tags manually!**

Release workflow:
1. Commit and push all changes
2. Update CHANGELOG.md with new version entry
3. Run `./scripts/release.sh <version>` (e.g., `./scripts/release.sh 0.13.0`)

The script automatically handles:
- VERSION file update
- Build verification
- Commit with changelog content
- Push to origin/main
- Git tag creation and push
- GitHub Release creation

**FORBIDDEN:**
- Running `git tag` manually
- Running `git push origin <tag>` manually
- Running `gh release create` manually

When user says "neuer RC" or "Release" → update CHANGELOG.md, then run `./scripts/release.sh`.

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
