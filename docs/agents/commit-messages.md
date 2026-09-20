# Commit Messages

Use a concise Conventional Commit subject:

```text
<type>(<optional scope>): <imperative summary>
```

Choose a type that describes the change: `feat`, `fix`, `docs`, `test`, `build`, `ci`, `refactor`, or `chore`.

Keep the subject specific and short, preferably 72 characters or fewer. Describe the intent and affected area, not every edited file. Use the body only when the reasoning, tradeoff, migration note, or risk is not obvious from the subject. Keep it to a few short paragraphs.

Add an issue or breaking-change footer only when one exists. Do not include a generated inventory of files, a long checklist, test logs, or implementation narration in the commit message.

Examples:

```text
feat(chatgpt): preserve wallpaper after page hydration
fix(ci): run DOM monitoring on pushes and pull requests
docs: document supported providers
```
