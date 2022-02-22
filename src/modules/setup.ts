import rimraf from 'rimraf';
import env from '../environment/environment';
import { RepositoryManager } from './repository-manager';


// TODO - Display console log events with styles (using chalk.js)
// NICE TO HAVE - Render console log events as React component
// pushing messages to a message stream (using)

const cleanUpEnvironment = (): Promise<void> => {
  return new Promise(resolve => {
    console.log('Cleaning up the environment repository at', env.repositoryPath);
    rimraf(env.repositoryPath, () => {
      console.log('Bare repository cleaned up');
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

