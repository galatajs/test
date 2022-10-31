const assert = require("node:assert");
const test = require("node:test");
const { createApp, createModule } = require("@galatajs/app");
const { createTestApp, getModule } = require("../dist");

const mainModule = createModule("main", {
  providers: [
    {
      name: "provider-1",
      value: "provider-1-value",
    },
    {
      name: "provider-2",
      value: "provider-2-value",
    },
  ],
});
const testApp = createTestApp();
const app = createApp(mainModule);
app.register(testApp);

test("test-module testing", async (t) => {
  await t.test("get main module and providers", async () => {
    await app.start();
    const mainModule = getModule("main");

    const provider1 = mainModule.getProvider("provider-1");
    assert.notStrictEqual(provider1, null);
    assert.strictEqual(provider1, "provider-1-value");

    const provider2 = mainModule.getProvider("provider-2");
    assert.notStrictEqual(provider2, null);
    assert.strictEqual(provider2, "provider-2-value");
  });
});
