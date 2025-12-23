#!/bin/bash
#
# NotSoDeFi Release Script
# Usage: ./scripts/release.sh <version>
# Example: ./scripts/release.sh 0.3.0-rc2
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if version argument is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Version argument required${NC}"
    echo "Usage: ./scripts/release.sh <version>"
    echo "Example: ./scripts/release.sh 0.3.0-rc2"
    exit 1
fi

VERSION=$1
DATE=$(date +%Y-%m-%d)

echo -e "${YELLOW}Preparing release v${VERSION}...${NC}"

# 1. Update VERSION file
echo "$VERSION" > VERSION
echo -e "${GREEN}Updated VERSION to ${VERSION}${NC}"

# 2. Check if CHANGELOG has entry for this version
if ! grep -q "\[${VERSION}\]" CHANGELOG.md; then
    echo -e "${RED}Warning: No CHANGELOG entry found for v${VERSION}${NC}"
    echo "Please add changelog entry before releasing."
    exit 1
fi

# 3. Run build to verify everything works
echo -e "${YELLOW}Running build...${NC}"
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Build successful${NC}"
else
    echo -e "${RED}Build failed!${NC}"
    exit 1
fi

# 4. Git operations
echo -e "${YELLOW}Committing changes...${NC}"
git add -A
git commit -m "feat: v${VERSION}

$(grep -A 20 "\[${VERSION}\]" CHANGELOG.md | head -20)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"

# 5. Push to origin
echo -e "${YELLOW}Pushing to origin...${NC}"
git push origin main

echo ""
echo -e "${GREEN}✓ Released v${VERSION}${NC}"
echo -e "  Cloudflare will auto-deploy in ~1-2 minutes"
echo -e "  Check: https://dash.cloudflare.com → Pages → notsodefi"
