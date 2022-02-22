import environment from '../../environment/environment';
import { join } from 'path';
import fs from 'fs';

export class FileAccess {

  getContent = async (path: string): Promise<string> => {
    const fullPath = this.getPath(path);
    const content: string = await fs.promises.readFile(fullPath, { encoding: 'utf8' });
    return content;
  }
  
  addOrUpdateFile = async (path: string, content: string): Promise<void> => {
    const fullPath = this.getPath(path);
    await fs.promises.writeFile(fullPath, content, { encoding: 'utf8' });
  }

  private getPath = (fullPath: string): string => {
    return join(environment.repositoryPath, fullPath);
  }
}


