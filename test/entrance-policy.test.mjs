import assert from "node:assert/strict";
import test from "node:test";
import { shouldPlayEntrance } from "../src/components/entrance-policy.ts";

test("entrance plays again on each load without a session or scroll gate", () => {
  assert.equal(shouldPlayEntrance(false, ""), true);
  assert.equal(shouldPlayEntrance(false, ""), true);
});

test("entrance still respects reduced motion and direct section links", () => {
  assert.equal(shouldPlayEntrance(true, ""), false);
  assert.equal(shouldPlayEntrance(false, "#team"), false);
});
