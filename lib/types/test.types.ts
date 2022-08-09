import { CorePlugin } from "@istanbul/app";

export interface TestModule {
  getProvider<T>(name: string): T | null;
}

export type TestAppCreator = () => CorePlugin;
export type ModuleGetter = (name: string) => TestModule | null;
