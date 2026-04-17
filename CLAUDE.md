# Career Profile Intake - CLAUDE.md

## Project Overview

Build a mini "Career Profile Intake" application for the AksesKerja Fullstack Developer Test.

**Goal:** Create a working fullstack app with form validation, backend API, SQLite persistence, and profile completeness scoring.

**Time Budget:** 3 hours effective work, 1 hour review/docs

---

## Tech Stack

- **Runtime:** Bun 1.3.5
- **Monorepo:** Bun workspaces
- **Frontend:** React 19, Vite 8, Tailwind CSS 4, shadcn/ui, React Hook Form 7, Zod 4
- **Backend:** Express 5, Prisma 7, SQLite, Jest 30, Supertest 7
- **Shared:** Zod 4 schemas

---

## Project Structure

```
/srv/akj-works/akj-test/
│
├── package.json                 # Root workspace config
├── tsconfig.json                # Base TypeScript config
├── .gitignore
├── .env.example
│
├── apps/
│   │
│   ├── frontend/                # Vite + React + Tailwind + shadcn
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── tailwind.config.js
│   │   ├── postcss.config.js
│   │   ├── tsconfig.json
│   │   ├── components.json      # shadcn config
│   │   ├── index.html
│   │   │
│   │   └── src/
│   │       ├── main.tsx
│   │       ├── App.tsx
│   │       ├── index.css
│   │       │
│   │       ├── components/
│   │       │   ├── ui/          # shadcn components
│   │       │   │   ├── button.tsx
│   │       │   │   ├── input.tsx
│   │       │   │   ├── textarea.tsx
│   │       │   │   ├── label.tsx
│   │       │   │   └── card.tsx
│   │       │   │
│   │       │   ├── CareerForm.tsx
│   │       │   └── SubmissionsList.tsx
│   │       │
│   │       ├── hooks/
│   │       │   ├── useSubmissionForm.ts
│   │       │   └── useDraft.ts
│   │       │
│   │       ├── lib/
│   │       │   ├── utils.ts     # cn() helper
│   │       │   └── api.ts       # API client
│   │       │
│   │       ├── services/
│   │       │   └── submissions.ts
│   │       │
│   │       └── types/
│   │           └── index.ts
│   │
│   └── backend/                 # Express + Prisma + SQLite (MVC)
│       ├── package.json
│       ├── tsconfig.json
│       ├── jest.config.ts
│       ├── .env
│       │
│       ├── src/
│       │   ├── index.ts         # App entry point
│       │   ├── app.ts           # Express app setup
│       │   ├── server.ts        # Server bootstrap
│       │   │
│       │   ├── config/
│       │   │   ├── index.ts
│       │   │   └── database.ts
│       │   │
│       │   ├── controllers/
│       │   │   ├── submissions.controller.ts
│       │   │   └── health.controller.ts
│       │   │
│       │   ├── routes/
│       │   │   ├── index.ts
│       │   │   ├── submissions.routes.ts
│       │   │   └── health.routes.ts
│       │   │
│       │   ├── services/
│       │   │   ├── submissions.service.ts
│       │   │   └── completeness.service.ts
│       │   │
│       │   ├── middlewares/
│       │   │   ├── error.ts
│       │   │   ├── validation.ts
│       │   │   └── cors.ts
│       │   │
│       │   ├── utils/
│       │   │   └── logger.ts
│       │   │
│       │   └── types/
│       │       └── express.d.ts
│       │
│       ├── prisma/
│       │   ├── schema.prisma
│       │   └── dev.db
│       │
│       └── tests/
│           ├── setup.ts
│           ├── controllers/
│           │   └── submissions.test.ts
│           ├── services/
│           │   ├── submissions.test.ts
│           │   └── completeness.test.ts
│           └── utils/
│               └── test-helpers.ts
│
└── packages/
    └── shared/                  # Shared schemas/types
        ├── package.json
        ├── tsconfig.json
        │
        └── src/
            ├── index.ts         # Barrel export
            └── schemas.ts       # Zod schemas
```

---

## Core Rules

### 1. Always Use Sequential Thinking

For any complex task or decision, use the `mcp__sequential-thinking__sequentialthinking` tool to work through problems methodically.

### 2. Always Consult Context7 for Documentation

Before implementing any library feature:

- Use `mcp__plugin_context7_context7__query-docs` to fetch current documentation
- Verify API syntax, configuration, and best practices
- Libraries: React, Vite, Express, Prisma, Zod, shadcn/ui, React Hook Form

### 3. Use shadcn MCP Server

For any shadcn component:

- Use `mcp__shadcn__get_add_command_for_items` to get install commands
- Use `mcp__shadcn__get_item_examples_from_registries` for usage examples
- Use `mcp__shadcn__search_items_in_registries` to find components

### 4. TDD Approach

- Write failing tests first
- Implement minimal code to pass
- Refactor with confidence
- Run tests frequently

### 5. Frequent Commits

- Commit after each passing test
- Commit after each feature complete
- Use conventional commits: `feat:`, `fix:`, `test:`, `chore:`

---

## Main Focused Points

1. **MVC Architecture** - Strict separation: Controllers handle HTTP, Services handle business logic
2. **Type Safety** - Shared Zod schemas between frontend and backend
3. **Validation** - Frontend (React Hook Form + Zod) and Backend (middleware)
4. **Testing** - Unit tests for services, integration tests for controllers
5. **UX Polish** - Character counter, draft autosave, clear error states

---

## Definition of Done

### Phase 1: Setup

- [ ] Monorepo structure created
- [ ] All packages installable with `bun install`
- [ ] TypeScript compiles without errors
- [ ] Prisma schema migrated

### Phase 2: Backend

- [ ] POST /api/submissions - Create submission
- [ ] GET /api/submissions - List all submissions
- [ ] GET /api/submissions/:id - Get single submission
- [ ] GET /api/submissions/:id/score - Get completeness score
- [ ] All unit tests passing (services)
- [ ] All integration tests passing (controllers)

### Phase 3: Frontend

- [ ] Form with all 7 fields
- [ ] Zod validation (required, min/max, enum)
- [ ] Character counter on bio (max 500)
- [ ] Empty/success/error states visible
- [ ] Submissions list view
- [ ] Completeness score display

### Phase 4: UX Features

- [ ] Draft autosave to localStorage
- [ ] Draft recovery on page load
- [ ] Clear draft button
- [ ] Debounced autosave (500ms)

### Phase 5: Documentation

- [ ] README.md (setup, run, architecture)
- [ ] AI_USAGE.md (tools, verification)
- [ ] TRADEOFFS.md (decisions, limitations)
- [ ] Demo evidence (3+ screenshots)

---

## Commands

```bash
# Root
bun install
bun run dev                    # Start both servers

# Backend
cd apps/backend
bun run dev                    # Dev server (port 3001)
bun run db:generate            # Generate Prisma client
bun run db:migrate             # Run migrations
bun run test                   # Run Jest tests
bun run test:coverage          # With coverage

# Frontend
cd apps/frontend
bun run dev                    # Dev server (port 3000)
bun run build                  # Production build

# Health check
curl http://localhost:3001/health
```

---

## Implementation Plan

See tasks in plan file: `/home/Blacksite/.claude/plans/read-instructions-md-first-read-shimmying-orbit.md`

**Execution approach:** Use `superpowers:subagent-driven-development` for parallel task execution.
