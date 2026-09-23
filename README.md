# LLM Wallpapers

> Personal wallpapers for AI conversations, designed to stay out of the way.

LLM Wallpapers is a Chromium extension that lets you bring a little more personality to AI chat interfaces without sacrificing readability. Choose an image, tune its opacity and blur, and keep the conversation in focus.

The project is currently an experimental provider alpha supporting Gemini, ChatGPT, and Claude.

[Report an issue](https://github.com/s-arbu/llm-wallpapers-extension/issues/new) | [View roadmap and issues](https://github.com/s-arbu/llm-wallpapers-extension/issues)

## What It Supports

| Provider | Status |
| --- | --- |
| Google Gemini | Supported |
| ChatGPT | Supported |
| Claude | Supported |

ChatGPT and Gemini are supported in the current alpha. Provider behavior is still subject to change as the extension adapts to upstream DOM changes.

## Features

- Select a local image as your conversation wallpaper.
- Compress large images before storing them in the browser.
- Adjust wallpaper opacity and blur in real time.
- Keep settings local to the browser through Chrome extension storage.
- Open a GitHub issue directly from the settings page.
- Add new AI providers through focused provider adapters.

## Install

The extension is currently available as an early build for Chromium-based browsers. A Chrome Web Store release is planned; until then, install it from the source repository:

<!-- markdownlint-disable MD033 -->
<details>
<summary>Show installation steps</summary>

1. Download or clone this repository.
2. Follow the build steps below to create the extension bundle.
3. Open `chrome://extensions` in your browser.
4. Turn on **Developer mode**.
5. Select **Load unpacked** and choose the repository's `dist/` folder.
6. Open [Gemini](https://gemini.google.com/), [ChatGPT](https://chatgpt.com/),or [Claude](https://claude.ai/) then open LLM Wallpapers from your browser toolbar.

After rebuilding, return to `chrome://extensions`, click the extension's reload button, and refresh the provider page.

</details>

<details>
<summary>Show requirements and build steps</summary>

Requirements:

- A Chromium-based browser with developer mode enabled.
- [Bun](https://bun.sh/) 1.4 or newer.

Build the extension:

```bash
bun install
bun run build
```

</details>

## Continuous Integration

GitHub Actions runs the unit tests, extension build, and live Playwright DOM
checks on every push, pull request, daily at 08:00 UTC, and on manual dispatch.
If a run fails, the Playwright report is uploaded as a workflow artifact.

## Privacy

Wallpaper images and settings stay in the browser's local extension storage. The project does not currently require an account, a backend, or a project server. The extension is designed to keep your selected images on your device.

## Roadmap

- [x] Gemini wallpaper support
- [x] ChatGPT wallpaper support
- [x] Claude wallpaper support
- [x] Local image compression and settings persistence
- [x] Provider adapter boundary
- [x] Automated provider matching tests and DOM monitoring
- [ ] Beta readiness: authenticated DOM checks, provider smoke checks, and release checklist
- [ ] Pre-release: Chrome Web Store packaging, privacy review, and rollback process
- [ ] V2: bundled wallpaper gallery with user-selectable presets
- [ ] V2: user-uploaded wallpapers alongside bundled presets

See [ROADMAP.md](ROADMAP.md) for scope, sequencing, and the authenticated test-state plan.

## Help and Feedback

Found a bug or have an idea? [Report an issue](https://github.com/s-arbu/llm-wallpapers-extension/issues/new) with the provider, browser version, steps to reproduce, and a screenshot when relevant. You can also [browse existing issues](https://github.com/s-arbu/llm-wallpapers-extension/issues) before opening a new one.

## Contributing

Contributions are welcome, although this is still a small early-stage project. Please open an issue first for larger changes so the direction can be agreed before implementation.

<details>
<summary>Show contribution guidelines</summary>

1. Fork the repository and create a new branch from the default branch. Do not work directly on `main`.
2. Use a short, descriptive branch name, such as `fix/gemini-overlay` or `feature/chatgpt-adapter`.
3. Keep each branch focused on one bug fix or feature.
4. Run `bun run build` before opening a pull request.
5. Explain what changed, how it was tested, and link the related issue.
6. Open the pull request against the default branch and respond to review feedback in the same branch.

For provider work, keep shared wallpaper behavior separate from provider-specific host matching, page transparency rules, DOM details, and service-specific quirks.

</details>

## License

This project is licensed under the [MIT License](LICENSE).
