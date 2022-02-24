import { RepositoryManager } from "../modules/git/repository-manager";

export interface Global {
  backEnabled: boolean;
  manager?: RepositoryManager;
}

export const global: Global = {
  backEnabled: true,
}

export const delay = (millis: number) => {
  return new Promise<void>(resolve => {
    setTimeout(resolve, millis);
  });
}
