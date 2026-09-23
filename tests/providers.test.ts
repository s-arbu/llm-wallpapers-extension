/// <reference types="bun" />

import { readFileSync } from 'node:fs';
import { expect, test } from 'bun:test';
import { getProvider } from '../src/providers';

const claudeStylesheet = readFileSync(new URL('../public/providers/claude.css', import.meta.url), 'utf8');

test('selects ChatGPT for chatgpt.com pages', () => {
  const provider = getProvider(new URL('https://chatgpt.com/'));

  expect(provider?.id).toBe('chatgpt');
});

test('selects ChatGPT for ChatGPT subdomains', () => {
  const provider = getProvider(new URL('https://auth.chatgpt.com/'));

  expect(provider?.id).toBe('chatgpt');
});

test('does not select ChatGPT for lookalike domains', () => {
  const provider = getProvider(new URL('https://chatgpt.com.example.com/'));

  expect(provider).toBeUndefined();
});

test('selects Claude for claude.ai pages', () => {
  const provider = getProvider(new URL('https://claude.ai/'));

  expect(provider?.id).toBe('claude');
});

test('does not select Claude for lookalike domains', () => {
  const provider = getProvider(new URL('https://claude.ai.example.com/'));

  expect(provider).toBeUndefined();
});

test('Claude transparency rules only target the requested layers', () => {
  expect(claudeStylesheet).toContain('#root');
  expect(claudeStylesheet).toContain(':where([data-cds-dock-masked]) .in-data-cds-dock-masked\\:bg-page');
  expect(claudeStylesheet).toContain('.bg-surface-1');
  expect(claudeStylesheet).toContain('.bg-page');
  expect(claudeStylesheet).toContain('.page-fade-b');
  expect(claudeStylesheet).toContain('background-image: none !important');
  expect(claudeStylesheet).toContain('background-color: transparent !important');
  expect(claudeStylesheet).not.toContain('--cds-surface-1: transparent !important');
  expect(claudeStylesheet).not.toContain('--cds-surface-3: transparent !important');
  expect(claudeStylesheet).not.toContain('[class*="bg-bg-"]');
  expect(claudeStylesheet).not.toContain('.bg-surface-3');
});
