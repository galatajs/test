import { CorePlugin, Module } from "@istanbul/app";
import { ModuleGetter, TestAppCreator, TestModule } from "../types/test.types";

let testModules: Map<string, Module> = new Map();

export const createTestApp: TestAppCreator = (): CorePlugin => {
  return {
    name: "test",
    version: "0.0.1",
    install(app, corePlugins, modules: Map<string, Module>) {
      testModules = modules;
    },
  };
};

export const getModule: ModuleGetter = (name: string): TestModule | null => {
  const module = testModules.get(name);
  return {
    getProvider<T>(name: string): T | null {
      if (module === undefined) return null;
      const provider = module.providers[name];
      if (!!provider) return provider;
      return null;
    },
  };
};
