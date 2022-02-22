import { ArticleDto } from "../../models/article.model";
import fs from 'fs';
import path from 'path';

export class ArticleValidator {

  validate = (article: ArticleDto): [boolean, string] => {
    if (!article.title) return [false, 'Title is required'];
    if (!article.filePath) return [false, 'File path is required'];
    if (!article.oneliner) return [false, 'Oneliner is required'];
    if (!article.url) return [false, 'Url is required'];
    if (!article.tags) return [false, 'Tags are required'];
  
    const { filePath } = article;
    if (!fs.existsSync(filePath)) return [false, 'File path does not exist'];
    if (path.extname(filePath) !== '.md') return [false, 'File path must be a markdown file'];
  
    return [true, ''];
  }
}