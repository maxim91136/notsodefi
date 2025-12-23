#!/bin/bash
#
# NotSoDeFi Release Script
# Usage: ./scripts/release.sh <version>
# Example: ./scripts/release.sh 0.3.0-rc3
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if version argument is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Version argument required${NC}"
    echo "Usage: ./scripts/release.sh <version>"
    echo "Example: ./scripts/release.sh 0.3.0-rc3"
    exit 1
fi

VERSION=$1
DATE=$(date +%Y-%m-%d)

echo ""
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║${NC}    NotSoDeFi Release v${VERSION}    ${BLUE}║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# ============================================================================
# Pre-flight Checks
# ============================================================================

echo -e "${YELLOW}[1/6] Checking documentation...${NC}"

# Check VERSION file
echo "$VERSION" > VERSION
echo -e "  ${GREEN}✓${NC} VERSION updated to ${VERSION}"

# Check CHANGELOG
if ! grep -q "\[${VERSION}\]" CHANGELOG.md; then
    echo -e "  ${RED}✗ CHANGELOG.md: No entry for v${VERSION}${NC}"
    echo -e "    Please add changelog entry before releasing."
    exit 1
fi
echo -e "  ${GREEN}✓${NC} CHANGELOG.md has entry for v${VERSION}"

# Check README exists and has content
if [ ! -f README.md ] || [ ! -s README.md ]; then
    echo -e "  ${RED}✗ README.md: Missing or empty${NC}"
    exit 1
fi
echo -e "  ${GREEN}✓${NC} README.md exists"

# Remind about README updates
echo -e "  ${YELLOW}!${NC} Remember to update README.md if needed"

# ============================================================================
# Build
# ============================================================================

echo -e "${YELLOW}[2/6] Running build...${NC}"
if npm run build > /dev/null 2>&1; then
    echo -e "  ${GREEN}✓${NC} Build successful"
else
    echo -e "  ${RED}✗ Build failed!${NC}"
    exit 1
fi

# ============================================================================
# Git Status
# ============================================================================

echo -e "${YELLOW}[3/6] Checking git status...${NC}"
if [ -z "$(git status --porcelain)" ]; then
    echo -e "  ${YELLOW}!${NC} No changes to commit"
    echo -e "  Exiting - nothing to release."
    exit 0
fi
echo -e "  ${GREEN}✓${NC} Changes detected"

# ============================================================================
# Git Commit
# ============================================================================

echo -e "${YELLOW}[4/6] Committing changes...${NC}"
git add -A
git commit -m "$(cat <<EOF
feat: v${VERSION}

$(grep -A 20 "\[${VERSION}\]" CHANGELOG.md | head -20)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
echo -e "  ${GREEN}✓${NC} Committed"

# ============================================================================
# Git Push
# ============================================================================

echo -e "${YELLOW}[5/6] Pushing to origin...${NC}"
git push origin main
echo -e "  ${GREEN}✓${NC} Pushed to origin/main"

# ============================================================================
# Done
# ============================================================================

echo -e "${YELLOW}[6/6] Verifying...${NC}"
COMMIT_HASH=$(git rev-parse --short HEAD)
echo -e "  ${GREEN}✓${NC} Commit: ${COMMIT_HASH}"

echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║${NC}    ${GREEN}✓ Released v${VERSION}${NC}              ${GREEN}║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""
echo -e "  Cloudflare auto-deploys in ~1-2 min"
echo -e "  ${BLUE}https://notsodefi.com${NC}"
echo ""
