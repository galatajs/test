
<p align="center">
<br>
<img src="https://avatars.githubusercontent.com/u/108695351?s=200&v=4" width="128" height="128">
</p>
<h3 align="center">@istanbul/test</h3>
<p align="center">
  Test package of <code>istanbul</code> framework. 
</p>

### What Is It?

Test module for IstanbulJS. This package has been developed to facilitate testing of modules when using module-based architecture. It is not a testing framework. If that's what you came for, `jest` or `mocha` is recommended.

### Installation

```bash
npm install --save-dev @istanbul/test
```

> or with yarn
> ```bash
> yarn add -D @istanbul/test
> ```

### Example

```typescript
import { createApp, createModule } from "@istanbul/app";
import { createTestApp } from "@istanbul/test";

class ProviderClass {
  greeting() : string {
    return "hello";
  }
}

const mainModule = createModule("main", {
  providers: [
    {
      name: "provider-1",
      value: "provider-1-value",
    },
    ProviderClass
  ]
})

const app = createApp(mainModule);
app.register(createTestApp())

beforeAll(async() => {
  await app.start();
})

describe("app testing", () => {
  it("check provider-1", () => {
    const module = getModule("main");
    const provider = module.getProvider("provider-1");
    expect(provider).toBe("provider-1-value");
  })

  it("check providerClass", () => {
    const module = getModule("main");
    const provider = module.getProvider("providerClass");
    expect(provider.greeting()).toBe("hello");
  })
})

afterAll(() => {
  app.close();
})
```

Note: IstanbulJS passes provider names through the `toCamelCase` function. So even though our provider is named `ProviderClass`, we called it `providerClass`.