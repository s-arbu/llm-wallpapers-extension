# Domain Docs

This is a single-context repository. Engineering skills should read the root `CONTEXT.md` before exploring the codebase when it exists, and read any relevant ADRs under `docs/adr/`.

If these files do not exist, proceed without treating their absence as a problem. Create them lazily when a domain term or architectural decision needs to be recorded.

## File structure

```text
/
├── CONTEXT.md
├── docs/adr/
└── src/
```

Use the vocabulary defined in `CONTEXT.md` when naming domain concepts in issues, proposals, tests, and implementation notes. Surface conflicts with existing ADRs instead of silently overriding them.
