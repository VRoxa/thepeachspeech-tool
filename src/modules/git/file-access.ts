import { join } from 'path';
import fs from 'fs';
import environment from '../../environment/environment';

export class FileAccess {

  constructor() { }
  
  getContent = async (path: string): Promise<string> => {
    return null;
  }
  
  addOrUpdateFile = async (fullPath: string, content: string): Promise<void> => {
    // const [folderPath, fileName] = splitFullPath(fullPath);

    // Create a file at the given fullPath with the content.
    // If the file exists, it will be overwritten.
    const filePath = this.getPath(fullPath);
    await new Promise<void>((resolve, reject) => {
      fs.writeFile(filePath, content, (err) => {
        !!err ? reject(err) : resolve();
      });
    });
  }

  private getPath = (fullPath: string): string => {
    return join(environment.repositoryPath, fullPath);
  }
}


