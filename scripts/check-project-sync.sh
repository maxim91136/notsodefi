#!/bin/bash
#
# Checks if project data is synchronized across all files
# Run before every release: ./scripts/check-project-sync.sh
#

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

echo "Checking project synchronization..."
echo ""

# Count project files (excluding index.ts)
INDEX_COUNT=$(ls -1 src/lib/data/projects/*.ts | grep -v index.ts | wc -l | tr -d ' ')
echo "Projects in index.ts: $INDEX_COUNT"

# Count in SPOF data (uses symbol: since scores are dynamic)
SPOF_COUNT=$(grep -c "symbol: '" src/app/spof/page.tsx || echo 0)
echo "Projects in SPOF page: $SPOF_COUNT"

# Check README table (actual content)
README_TABLE=$(grep -c "^|.*|.*|.*|.*|$" README.md | head -1)
# Subtract 2 for header rows
README_TABLE=$((README_TABLE - 2))
echo "README table: $README_TABLE entries"

echo ""

# Validate
ERRORS=0

if [ "$INDEX_COUNT" != "$SPOF_COUNT" ]; then
    echo -e "${RED}✗ SPOF page mismatch ($SPOF_COUNT vs $INDEX_COUNT)${NC}"
    ERRORS=$((ERRORS + 1))
fi

if [ "$INDEX_COUNT" != "$README_TABLE" ]; then
    echo -e "${RED}✗ README table mismatch ($README_TABLE vs $INDEX_COUNT)${NC}"
    ERRORS=$((ERRORS + 1))
fi

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ All project data synchronized ($INDEX_COUNT projects)${NC}"
    exit 0
else
    echo ""
    echo -e "${RED}$ERRORS synchronization errors found!${NC}"
    exit 1
fi
