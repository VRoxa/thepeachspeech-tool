import { ArticleDto } from "../models/article.model";
import { RepositoryManager } from "../modules/git/repository-manager";

export interface Operation {
  operation: 'create' | 'delete' | 'update';
  article: ArticleDto;
}

export interface Global {
  operations: Operation[];
  backEnabled: boolean;
  manager?: RepositoryManager;
}

export const global: Global = {
  operations: [],
  backEnabled: true,
}

export const delay = (millis: number) => {
  return new Promise<void>(resolve => {
    setTimeout(resolve, millis);
  });
}
