import { CorePlugin } from "@galatajs/app";

export interface TestModule {
  getProvider<T>(name: string): T | null;
  getRequiredProvider<T>(name: string): T;
}

export type TestAppCreator = () => CorePlugin;
export type ModuleGetter = (name: string) => TestModule;
