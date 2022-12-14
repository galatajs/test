import { CorePlugin, Module } from "@galatajs/app";
import { ModuleGetter, TestAppCreator, TestModule } from "../types/test.types";

let testModules: Map<string, Module> = new Map();

export const createTestApp: TestAppCreator = (): CorePlugin => {
  return {
    loadLast: true,
    name: "test",
    version: "0.1.1",
    install(app, corePlugins, modules: Map<string, Module>) {
      testModules = modules;
    },
  };
};

export const getModule: ModuleGetter = (name: string): TestModule => {
  const module = testModules.get(name);
  return {
    getProvider<T>(name: string): T | null {
      if (module === undefined) return null;
      const provider: T = module.providers[name];
      if (!!provider) return provider;
      return null;
    },
    getRequiredProvider<T>(name: string): T {
      const provider = this.getProvider<T>(name);
      if (provider === null) throw new Error(`Provider ${name} not found`);
      return provider;
    },
  };
};
