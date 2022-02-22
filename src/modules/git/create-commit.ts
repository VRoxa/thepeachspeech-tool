
import git from 'simple-git';
import environment from '../../environment/environment';


export const createCommit = async (message: string) => {
  const repository = git(environment.repositoryPath);
  await repository.add('./*');
  await repository.commit(message);
}