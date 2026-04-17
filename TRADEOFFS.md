# Trade-off Notes

This document describes the technical decisions, priorities, and limitations encountered during development of the Career Profile Intake application.

---

## Technical Decisions

### 1. Monorepo with Bun Workspaces

**Decision:** Use Bun workspaces instead of npm/yarn.

**Why:**

- Faster installation and startup
- Native TypeScript support
- Simplified workspace management

**Trade-off:** Less ecosystem support compared to npm, but Bun's compatibility is sufficient for this project.

---

### 2. Prisma with Custom Output

**Decision:** Generated Prisma client to `apps/backend/generated/prisma` instead of default location.

**Why:** Better organization and clearer separation from source code.

**Trade-off:** Requires manual import paths in services, but improves project structure.

---

### 3. SQLite over PostgreSQL

**Decision:** SQLite instead of a full database server.

**Why:**

- Zero configuration required
- File-based persistence is portable
- Sufficient for this scale

**Trade-off:** Not suitable for production-scale concurrent writes, but acceptable for this test.

---

### 4. Shared Zod Schemas

**Decision:** Single source of truth for validation in `packages/shared`.

**Why:**

- Eliminates duplication between frontend/backend validation
- Type safety across the stack
- Easier to maintain consistency

**Trade-off:** Requires careful version management between packages.

---

### 5. MVC Architecture

**Decision:** Strict separation between Controllers (HTTP logic) and Services (business logic).

**Why:**

- Clear responsibility boundaries
- Easier to test services in isolation
- Scales well for larger applications

**Trade-off:** More files, but worth it for maintainability.

---

### 6. shadcn/ui (base-vega theme)

**Decision:** Use shadcn/ui with base-vega theme instead of building from scratch.

**Why:**

- Production-quality components
- Accessible by default
- Tailwind CSS integration

**Trade-off:** Larger bundle size, but acceptable for this project.

---

## What Was Prioritized

1. **Core functionality first:** Form submission, retrieval, and scoring
2. **Type safety:** Shared schemas, strict TypeScript
3. **Test coverage:** Unit tests for services, integration tests for controllers
4. **Clean architecture:** MVC pattern, clear file organization
5. **UX basics:** Character counter, loading states, error handling

---

## What Was Skipped (Known Limitations)

| Feature                | Reason                                                    | Priority |
| ---------------------- | --------------------------------------------------------- | -------- |
| Draft autosave         | Time constraints - localStorage hook not yet implemented  | Medium   |
| Frontend service layer | Stub exists, but API client in `lib/api.ts` is sufficient | Low      |
| Edit/Delete UI         | Not explicitly required in brief                          | Low      |
| Pagination             | Small dataset assumed                                     | Low      |
| Authentication         | Out of scope for this test                                | N/A      |
| Email notifications    | Out of scope                                              | N/A      |

---

## Implementation Shortcuts Taken

1. **Skills as comma-separated string:** Stored as CSV in database instead of separate join table. Simpler but less flexible for querying.

2. **No test database migration:** Tests use separate `test.db` but migration only creates `dev.db`. Manual setup required.

3. **Minimal error messages:** Error middleware returns generic messages. Could be more descriptive.

4. **No frontend form persistence:** Form data lost on refresh. Draft autosave hook planned but not implemented.

5. **Single-page navigation:** Uses React Router but could benefit from proper route guards and error boundaries.

---

## Future Improvements

If time allowed, these would be added:

1. **Draft autosave hook** (`useDraft.ts`) with localStorage and debounce
2. **Edit submission** endpoint and UI
3. **Pagination** for submissions list
4. **Search/filter** by role, location, or skills
5. **Export** submissions as CSV/JSON
6. **Rate limiting** on POST endpoint
7. **Request logging** middleware (winston already configured)

---

## Summary

This project prioritizes **clarity, correctness, and maintainability** over feature completeness. The architecture supports future expansion, and the codebase is structured to be easily understood and extended.
