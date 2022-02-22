import { Clone, FetchOptions, Remote, Repository } from "nodegit";
import { getCredentialsCallbacks } from "./credentials";

export class RepositoryManager {

  private repository!: Repository;

  clone = async (repositoryUrl: string, cloningPath: string) => {
    this.repository = await Clone.clone(repositoryUrl, cloningPath, { 
      bare: 0,
      fetchOpts: {
        callbacks: getCredentialsCallbacks()
      }
    });
  }

  fetch = async () => {
      // Fetch any change from the remote 'master' branch
    const remote = await Remote.lookup(this.repository, 'origin');
    
    const options: FetchOptions = {
      downloadTags: 1,
      prune: 1,
      updateFetchhead: 1,
      callbacks: getCredentialsCallbacks()
    };

    await remote.fetch(['+refs/*:refs/*'], options, 'Automated');
  }

  push = async () => {
    const remote = await Remote.lookup(this.repository, 'origin');
    await remote.push(['refs/heads/master:refs/heads/master'], {
      callbacks: getCredentialsCallbacks()
    });
  }
}