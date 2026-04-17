# AI Usage Notes

This project was built with assistance from multiple AI tools. Below is a summary of what each tool was used for and how the output was verified.

---

## AI Tools Used

### Gemini

- **Used for:** Capturing and converting the test document (`instructions.md`) into Markdown format so it could be consumed by AI tools for reference.
- **Verification:** Manually checked the converted Markdown against the original document to ensure all requirements were preserved.

### Claude Code

- **Used for:**
  - Consuming the converted test document to build `CLAUDE.md` (project setup, architecture, and implementation plan)
  - Creating the implementation plan for the assessment
  - Project structuring and full development work with supervision
  - Code review and problem solving
- **Key features used:**
  - Sequential thinking for complex problem decomposition
  - MCP servers: Context7 (documentation), shadcn (component examples), Context Mode (large file processing)
- **Verification:** All generated code was reviewed, type-checked, and tested before acceptance.

### GitHub Copilot

- **Used for:** Fixing complicated TypeScript errors and direct typing errors during implementation.
- **Verification:** Each suggestion was reviewed before acceptance.

---

## Verification Process

All AI-generated code was verified through:

1. Manual code review
2. TypeScript type checking (`tsc --noEmit`)
3. Running Jest tests
4. Manual API testing with curl

---

## Summary

| Tool           | Purpose                                        |
| -------------- | ---------------------------------------------- |
| Gemini         | Document capture and conversion                |
| Claude Code    | Planning, architecture, implementation, review |
| GitHub Copilot | Error fixing, inline completions               |
