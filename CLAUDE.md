# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Investment document review chat interface prototype built with React, TypeScript, and Vite. The app showcases multiple UI component variants for investment flows including deal previews, document signing, and risk assessment.

## Commands

```bash
npm install    # Install dependencies
npm run dev    # Start dev server (Vite)
npm run build  # Production build
npm run lint   # Run ESLint
```

## Architecture

### Tech Stack
- React 18 + TypeScript
- Vite for bundling
- Tailwind CSS with semantic design tokens
- Lucide React for icons
- clsx + tailwind-merge for className composition

### Design System & Semantic Tokens

All colors use CSS custom properties defined in `src/index.css`. **Always use semantic tokens instead of hardcoded colors:**

| Token | Usage |
|-------|-------|
| `foreground` / `background` | Base text and page background |
| `card` / `card-foreground` | Card surfaces |
| `muted` / `muted-foreground` | Secondary text, disabled states |
| `primary` / `primary-foreground` | Primary buttons, main actions |
| `secondary` / `secondary-foreground` | Secondary buttons |
| `accent` / `accent-foreground` | Highlights, links, focus states |
| `destructive` | Errors, danger actions |
| `success` | Success states, confirmations |
| `warning` | Warnings, caution states |
| `info` | Informational elements |
| `border` | All borders |
| `chat-user` / `chat-ai` | Chat message bubbles |

Use `cn()` from `src/lib/utils.ts` to merge Tailwind classes safely.

### Folder Structure

```
src/
├── components/
│   ├── ui/                    # Shared UI primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Badge.tsx
│   │   ├── SuggestionChip.tsx
│   │   └── index.ts
│   ├── chat/                  # Chat layout components
│   │   ├── ChatLayout.tsx     # Shared chat page wrapper
│   │   ├── ChatMessage.tsx    # AI message bubble + attachments
│   │   └── index.ts
│   ├── views/                 # Feature views with variants
│   │   ├── InvestmentReview/
│   │   │   ├── index.tsx          # Main export + variant switching
│   │   │   ├── OriginalVariant.tsx
│   │   │   └── CompactVariant.tsx
│   │   ├── DealPreview/
│   │   ├── DealInvestment/
│   │   ├── InvestmentRisk/
│   │   ├── DocumentDetail/
│   │   ├── SignatureInput/
│   │   ├── DocumentSigning/
│   │   └── index.ts
│   └── ComponentShowcase.tsx  # Gallery wrapper for prototyping
├── lib/
│   └── utils.ts               # cn() helper
└── App.tsx                    # Showcase configuration
```

### Component Variant Pattern

Each view follows a consistent structure:

1. **`index.tsx`** - Main component with variant switching logic
2. **`*Variant.tsx`** - Individual variant implementations
3. **Shared subcomponents** - Reusable pieces (e.g., `DealCard.tsx`, `RiskCard.tsx`)

Example variant structure:
```tsx
// views/ExampleView/index.tsx
export type ExampleVariant = 'full' | 'minimal';

const variants = [
  { id: 'full', label: 'Full Details' },
  { id: 'minimal', label: 'Minimal' },
];

export function ExampleView() {
  const [variant, setVariant] = useState<ExampleVariant>('full');

  return (
    <ChatLayout variants={variants} activeVariant={variant} onVariantChange={setVariant}>
      <ChatMessage content={variant === 'full' ? <FullVariant /> : <MinimalVariant />} />
    </ChatLayout>
  );
}
```

### Adding New Components

1. Create folder in `src/components/views/YourComponent/`
2. Add `index.tsx` with main component and variant type export
3. Create separate `*Variant.tsx` files for each variant
4. Export from `src/components/views/index.ts`
5. Add to showcase in `App.tsx`
6. Use UI primitives from `src/components/ui/`
7. Use semantic tokens - never hardcode colors like `gray-500` or `violet-600`
