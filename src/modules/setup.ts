import rimraf from 'rimraf';
import env from '../environment/environment';
import { RepositoryManager } from './git/repository-manager';


// TODO - Display console log events with styles (using chalk.js)
// NICE TO HAVE - Render console log events as React component
// pushing messages to a message stream (using)

const cleanUpEnvironment = (): Promise<void> => {
  return new Promise(resolve => {
    rimraf(env.repositoryPath, () => {
      resolve();
    });
  });
}

export const setup = async (): Promise<RepositoryManager> => {
  await cleanUpEnvironment();
  
  const manager = new RepositoryManager();
  await manager.clone(env.repositoryUrl, env.repositoryPath);
  await manager.fetch();

  return manager;
}
