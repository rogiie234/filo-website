import assert from "node:assert/strict";
import test from "node:test";
import { applyTheme } from "../src/scripts/theme.ts";

test("theme updates palette, accessible control and persistence, including denied storage", (context) => {
  const originalDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
  const originalStorage = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  context.after(() => {
    if (originalDocument) Object.defineProperty(globalThis, "document", originalDocument);
    else delete globalThis.document;
    if (originalStorage) Object.defineProperty(globalThis, "localStorage", originalStorage);
    else delete globalThis.localStorage;
  });
  const pressed = {};
  const browserColor = {};
  const page = {
    documentElement: { dataset: {} },
    getElementById: () => ({ setAttribute: (name, value) => { pressed[name] = value; } }),
    querySelector: () => ({ setAttribute: (name, value) => { browserColor[name] = value; } }),
  };
  const stored = {};
  Object.defineProperty(globalThis, "document", { configurable: true, value: page });
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: { setItem: (key, value) => { stored[key] = value; } } });

  applyTheme("dark");
  assert.equal(page.documentElement.dataset.theme, "dark");
  assert.equal(pressed["aria-checked"], "true");
  assert.equal(pressed.title, "Switch to light mode");
  assert.equal(browserColor.content, "#0f1a17");
  assert.equal(stored["filo:theme"], "dark");

  applyTheme("light");
  assert.equal(page.documentElement.dataset.theme, "light");
  assert.equal(pressed["aria-checked"], "false");
  assert.equal(pressed.title, "Switch to dark mode");
  assert.equal(stored["filo:theme"], "light");

  Object.defineProperty(globalThis, "localStorage", { configurable: true, get: () => { throw new Error("Storage denied"); } });
  assert.doesNotThrow(() => applyTheme("dark"));
  assert.equal(page.documentElement.dataset.theme, "dark");
  assert.equal(pressed["aria-checked"], "true");
});
