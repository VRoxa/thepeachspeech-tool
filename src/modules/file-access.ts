import { Repository, Tree, Treebuilder, Blob, TreeEntry } from "nodegit";

export class FileAccess {

  constructor(private repository: Repository) { }
  
  getContent = async (path: string): Promise<string> => {
    const tree = await this.getTree();
    const fileEntry = await tree.entryByPath(path);
  
    const fileContent = await this.repository.getBlob(fileEntry.oid())
    .then(blob => blob.toString());
    
    return fileContent;
  }
  
  addOrUpdateFile = async (path: string, content: string): Promise<void> => {
    const tree = await this.getTree();
    const builder = await Treebuilder.create(this.repository, tree);
  
    const buffer = Buffer.from(content, 'utf8');
    const oid = await Blob.createFromBuffer(this.repository, buffer, buffer.length);
    
    await builder.insert(path, oid, TreeEntry.FILEMODE.BLOB);
  }

  private getTree = async (): Promise<Tree> => {
    const head = await this.repository.getBranchCommit('master');
    const tree = await head.getTree();
    return tree;
  }
}


