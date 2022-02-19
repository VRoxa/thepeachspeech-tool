import { Clone, Repository, Remote, FetchOptions } from 'nodegit';
import rimraf from 'rimraf';

export const bareRepositoryPath = './thepeachspeech';
export const repositoryUrl = 'https://github.com/VRoxa/thepeachspeech';

// TODO - Display console log events with styles (using chalk.js)
// NICE TO HAVE - Render console log events as React component
// pushing messages to a message stream (using rx.js?).

const cleanUpEnvironment = (): Promise<void> => {
  return new Promise(resolve => {
    console.log('Cleaning up the environment repository at', bareRepositoryPath);
    rimraf(bareRepositoryPath, () => {
      console.log('Bare repository cleaned up');
      resolve();
    });
  });
}

const clone = (): Promise<Repository> => {
  console.log('Cloning repository from source', repositoryUrl);
  return Clone.clone(repositoryUrl, bareRepositoryPath, { 
    bare: 1 
  });
}

export const setup = async (): Promise<Repository> => {
  await cleanUpEnvironment();
  await clone();

  const repository = await Repository.open(bareRepositoryPath);

  // Fetch any change from the remote 'master' branch
  const remote = await Remote.lookup(repository, 'origin');
  
  const options: FetchOptions = {
    downloadTags: 1,
    prune: 1,
    updateFetchhead: 1
  };
  await remote.fetch(['+refs/*:refs/*'], options, 'Fetched all references from repository');
  return repository;
}

