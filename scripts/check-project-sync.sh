#!/bin/bash
#
# Checks if project counts are synchronized across all files
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

# Count in SPOF data
SPOF_COUNT=$(grep -c "project: '" src/app/spof/page.tsx || echo 0)
echo "Projects in SPOF page: $SPOF_COUNT"

# Check README counts
README_HEADER=$(grep -o "[0-9]* Projects" README.md | head -1 | grep -o "[0-9]*")
README_BODY=$(grep -o "across [0-9]* projects" README.md | grep -o "[0-9]*")
README_TABLE=$(grep -c "^|.*|.*|.*|.*|$" README.md | head -1)
# Subtract 2 for header rows
README_TABLE=$((README_TABLE - 2))
echo "README header: $README_HEADER projects"
echo "README body: $README_BODY projects"
echo "README table: $README_TABLE entries"

# Check layout.tsx
LAYOUT_COUNT=$(grep -o "[0-9]* projects ranked" src/app/layout.tsx | head -1 | grep -o "[0-9]*")
echo "layout.tsx OG: $LAYOUT_COUNT projects"

# Check SPOF layout
SPOF_LAYOUT=$(grep -o "for [0-9]* crypto" src/app/spof/layout.tsx | grep -o "[0-9]*")
echo "SPOF layout: $SPOF_LAYOUT projects"

echo ""

# Validate
ERRORS=0

if [ "$INDEX_COUNT" != "$SPOF_COUNT" ]; then
    echo -e "${RED}✗ SPOF page count mismatch ($SPOF_COUNT vs $INDEX_COUNT)${NC}"
    ERRORS=$((ERRORS + 1))
fi

if [ "$INDEX_COUNT" != "$README_HEADER" ]; then
    echo -e "${RED}✗ README header mismatch ($README_HEADER vs $INDEX_COUNT)${NC}"
    ERRORS=$((ERRORS + 1))
fi

if [ "$INDEX_COUNT" != "$README_BODY" ]; then
    echo -e "${RED}✗ README body mismatch ($README_BODY vs $INDEX_COUNT)${NC}"
    ERRORS=$((ERRORS + 1))
fi

if [ "$INDEX_COUNT" != "$README_TABLE" ]; then
    echo -e "${RED}✗ README table mismatch ($README_TABLE vs $INDEX_COUNT)${NC}"
    ERRORS=$((ERRORS + 1))
fi

if [ "$INDEX_COUNT" != "$LAYOUT_COUNT" ]; then
    echo -e "${RED}✗ layout.tsx mismatch ($LAYOUT_COUNT vs $INDEX_COUNT)${NC}"
    ERRORS=$((ERRORS + 1))
fi

if [ "$INDEX_COUNT" != "$SPOF_LAYOUT" ]; then
    echo -e "${RED}✗ SPOF layout mismatch ($SPOF_LAYOUT vs $INDEX_COUNT)${NC}"
    ERRORS=$((ERRORS + 1))
fi

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ All project counts synchronized ($INDEX_COUNT projects)${NC}"
    exit 0
else
    echo ""
    echo -e "${RED}$ERRORS synchronization errors found!${NC}"
    exit 1
fi
