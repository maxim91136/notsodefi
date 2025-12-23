# NotSoDeFi - Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── projects/
│   │   ├── page.tsx              # Projects overview/comparison
│   │   └── [id]/
│   │       └── page.tsx          # Single project detail
│   └── calculator/
│       └── page.tsx              # Interactive score calculator
│
├── components/
│   ├── ui/                       # Reusable UI primitives
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Slider.tsx
│   │   └── ScoreRing.tsx
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── scores/                   # Score display components
│   │   ├── ScoreCard.tsx         # Individual score display
│   │   ├── ScoreSummary.tsx      # All 3 scores overview
│   │   └── CriterionRow.tsx      # Single criterion display
│   └── projects/                 # Project-specific components
│       ├── ProjectCard.tsx
│       ├── ProjectTable.tsx
│       └── ComparisonView.tsx
│
├── lib/
│   ├── framework/                # Core framework logic
│   │   ├── index.ts              # Public exports
│   │   ├── types.ts              # TypeScript types
│   │   ├── scoring.ts            # Score calculation logic
│   │   └── criteria/
│   │       ├── index.ts          # All criteria exports
│   │       ├── chain.ts          # A1-A4: Chain Score
│   │       ├── control.ts        # B5-B8: Control Score
│   │       └── fairness.ts       # C9-C10: Fairness Score
│   ├── data/                     # Static data
│   │   ├── projects/             # Individual project files
│   │   │   ├── bitcoin.ts
│   │   │   ├── ethereum.ts
│   │   │   └── ...
│   │   └── index.ts              # Data exports
│   └── utils/                    # Utility functions
│       ├── formatting.ts         # Number/string formatting
│       └── colors.ts             # Score color helpers
│
└── hooks/                        # React hooks
    ├── useProjects.ts
    └── useScoreCalculator.ts
```

## Naming Conventions

- **Files**: `camelCase.ts` for utilities, `PascalCase.tsx` for components
- **Folders**: `kebab-case` or `camelCase`
- **Criteria IDs**: `A1`, `A2`, `B5`, etc. (matching framework spec)
- **Components**: Functional components with explicit props types

## Key Design Decisions

1. **Framework as library**: All scoring logic in `lib/framework/` - reusable, testable
2. **Data separate from logic**: Project data in `lib/data/`, can be swapped for API
3. **Component hierarchy**: ui (primitives) → scores (domain) → projects (features)
4. **Colocation**: Related files stay together (criteria with scoring)
