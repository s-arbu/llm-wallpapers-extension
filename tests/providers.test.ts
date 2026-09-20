/// <reference types="bun" />

import { expect, test } from 'bun:test';
import { getProvider } from '../src/providers';

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
