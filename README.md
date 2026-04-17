# Career Profile Intake

A fullstack application for collecting and managing career profile submissions. Built for the AksesKerja Fullstack Developer Test.

## Tech Stack

### Runtime & Monorepo

- **Runtime:** Bun 1.3.5
- **Package Manager:** Bun workspaces

### Frontend (`apps/frontend`)

- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS 4 + shadcn/ui (base-vega)
- **Forms:** React Hook Form 7 + Zod 4
- **Routing:** React Router 7
- **Icons:** Lucide React

### Backend (`apps/backend`)

- **Framework:** Express 5
- **ORM:** Prisma 7 (SQLite)
- **Testing:** Jest 30 + Supertest 7
- **Validation:** Zod 4

### Shared (`packages/shared`)

- **Schemas:** Zod 4 (shared between frontend/backend)

## Project Structure

```
akj-test/
├── apps/
│   ├── frontend/          # Vite + React + Tailwind + shadcn
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── ui/    # shadcn primitives
│   │   │   │   └── Submissions/
│   │   │   ├── lib/       # API client, utils
│   │   │   └── App.tsx
│   │   └── package.json
│   │
│   └── backend/           # Express + Prisma + SQLite (MVC)
│       ├── src/
│       │   ├── controllers/
│       │   ├── services/
│       │   ├── routes/
│       │   ├── middlewares/
│       │   └── config/
│       ├── prisma/
│       │   └── schema.prisma
│       └── tests/
│
└── packages/
    └── shared/            # Shared Zod schemas
        └── src/
            ├── index.ts
            └── schemas.ts
```

## Getting Started

### Prerequisites

- **Bun 1.3.5+** - Install with: `curl -fsSL https://bun.sh/install | bash`

### Step 1: Install Dependencies

```bash
cd /srv/akj-works/akj-test
bun install
```

This installs all dependencies for:

- Root workspace
- `apps/frontend`
- `apps/backend`
- `packages/shared`

### Step 2: Setup Database

```bash
cd apps/backend

# Generate Prisma client (creates TypeScript types from schema)
bun run db:generate

# Run migrations (creates SQLite database at prisma/dev.db)
bun run db:migrate
```

### Step 3: Run Development Servers

```bash
# From root - start both frontend and backend
bun run dev
```

This starts:

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:3001

**Alternative - run servers separately:**

```bash
# Terminal 1 - Backend only
cd apps/backend && bun run dev

# Terminal 2 - Frontend only
cd apps/frontend && bun run dev
```

### Step 4: Verify Setup

```bash
# Check backend health
curl http://localhost:3001/api/health

# Expected response:
# {"status":"ok","timestamp":"2026-04-17T10:08:32.012Z"}
```

### Step 5: Open in Browser

Navigate to **http://localhost:3000** to see the Career Profile Intake form.

---

### Quick Start (All Commands)

```bash
# Full setup from scratch
cd /srv/akj-works/akj-test
bun install
cd apps/backend && bun run db:generate && bun run db:migrate
cd ../.. && bun run dev
```

Then open http://localhost:3000 in your browser.

## API Reference

### Endpoints

| Method   | Endpoint                     | Description            |
| -------- | ---------------------------- | ---------------------- |
| `GET`    | `/api/health`                | Health check           |
| `POST`   | `/api/submissions`           | Create new submission  |
| `GET`    | `/api/submissions`           | List all submissions   |
| `GET`    | `/api/submissions/:id`       | Get single submission  |
| `GET`    | `/api/submissions/:id/score` | Get completeness score |
| `DELETE` | `/api/submissions/:id`       | Delete submission      |

### Request/Response Examples

#### POST /api/submissions

```json
// Request
{
  "fullName": "John Doe",
  "targetRole": "Senior Frontend Developer",
  "yearsExperience": 5,
  "skills": ["React", "TypeScript", "Node.js"],
  "shortBio": "Experienced developer...",
  "location": "Jakarta, Indonesia",
  "preferredWorkType": "remote"
}

// Response (201)
{
  "data": { /* submission */ },
  "completeness": {
    "score": 85,
    "missingFields": [],
    "details": { /* field validity */ }
  }
}
```

#### GET /api/submissions/:id/score

```json
// Response (200)
{
  "data": {
    "score": 85,
    "missingFields": [],
    "details": {
      "fullName": true,
      "targetRole": true,
      "skills": true
      // ...
    }
  }
}
```

## Architecture

### Backend (MVC Pattern)

```
Request → Routes → Controller → Service → Prisma → Database
                                              ↓
Response ← Controller ← Service ←─── Result
```

- **Controllers:** Handle HTTP request/response, call services
- **Services:** Business logic, data transformation, Prisma calls
- **Routes:** Express Router, route-specific middleware
- **Middlewares:** Error handling, validation, CORS

### Frontend

- **React Hook Form + Zod:** Form state and validation
- **shadcn/ui:** Component library built on Radix UI
- **React Router:** Client-side routing
- **API Client:** Centralized fetch wrapper (`src/lib/api.ts`)

### Shared Layer

- **Zod Schemas:** Single source of truth for validation rules
- Used by both frontend (form validation) and backend (request validation)

## Form Fields

| Field             | Type     | Validation                       |
| ----------------- | -------- | -------------------------------- |
| fullName          | string   | Required                         |
| targetRole        | string   | Required                         |
| yearsExperience   | number   | 0-50                             |
| skills            | string[] | Optional (comma-separated input) |
| shortBio          | string   | Max 500 chars                    |
| location          | string   | Required                         |
| preferredWorkType | enum     | remote/hybrid/onsite             |

## Completeness Score Algorithm

Score is calculated as:

1. **Required Fields (60%):** 7 fields checked for validity
2. **Quality Bonuses (40%):**
   - Bio length >= 50 chars: +10
   - Skills >= 3: +10
   - Years experience >= 2: +10
   - Target role length >= 3: +10

Total capped at 100.

## Testing

```bash
# Run all backend tests
cd apps/backend && bun run test

# With coverage
bun run test:coverage

# Watch mode
bun run test:watch
```

### Test Structure

- **Unit Tests:** Services (`tests/services/`)
- **Integration Tests:** Controllers (`tests/controllers/`)
- **Test Helpers:** Mock data, common setup (`tests/utils/`)

## Deliverables

| File             | Status      |
| ---------------- | ----------- |
| Source Code      | ✅ Complete |
| README.md        | ✅ Complete |
| AI_USAGE.md      | ✅ Complete |
| TRADEOFFS.md     | ✅ Complete |
| Demo Screenshots | 🔄 TODO     |

## Known Limitations

1. **Draft Autosave:** Not yet implemented (localStorage persistence for form recovery)
2. **Frontend Service Layer:** `apps/frontend/src/services/submissions.ts` is a stub
3. **Test Database:** Separate test DB migration not configured

## License

Private - AksesKerja Hiring Process
