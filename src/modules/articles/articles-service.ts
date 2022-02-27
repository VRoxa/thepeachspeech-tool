import { Article, ArticleDto } from "../../models/article.model";
import { ArticleValidator } from "./article-validator";
import { FileAccess } from "../git/file-access";
import fs from 'fs';
import { global } from "../../environment/global";

type RawArticle = Omit<Article, 'date'> & { date: string };

const readContent = (filePath: string): Promise<string> => {
  return fs.promises.readFile(filePath, { encoding: 'utf8' });
}

const articlesJsonFilePath = 'src/assets/articles.json';
const articlesFolderPath = 'src/assets/articles';

export class ArticlesService {

  private readonly validator: ArticleValidator;
  private readonly fileAccess: FileAccess;

  constructor(fileAccess: FileAccess) { 
    this.fileAccess = fileAccess;
    this.validator = new ArticleValidator();
  }

  getAll = async (): Promise<Article[]> => {
    const articlesJson = await this.fileAccess.getContent(articlesJsonFilePath);
    const articles: RawArticle[] = JSON.parse(articlesJson);
    return articles.map(article => ({
      ...article,
      date: new Date(article.date)
    }));
  }

  add = async (articleDto: ArticleDto): Promise<[boolean, string]> => {
    // Validate article DTO
    const [valid, error] = this.validator.validate(articleDto);
    if (!valid) {
      return [false, error];
    }

    // Check if article markdown file exists.
    let articles = await this.getAll();
    const isDuplicated = articles.some(({ url }) => url === articleDto.url);
    if (isDuplicated) {
      return [false, `Article '${articleDto.url}' already exists`];
    }

    // Extract article from ArticleDto
    let { filePath, ...article } = articleDto;
    article = {...article, date: new Date() } as Required<Article>;

    try {

      // Update articles.json file
      articles = [...articles, articleDto as Required<Article>];
      await this.fileAccess.addOrUpdateFile(articlesJsonFilePath, JSON.stringify(articles, null, 2));
      
      // Upload article markdown file
      const articleFilePath = `${articlesFolderPath}/${articleDto.url}.md`;
      const articleContent = await readContent(filePath);
      await this.fileAccess.addOrUpdateFile(articleFilePath, articleContent);
    } catch (err) {
      return [false, err.message];
    }

    global.operations = [...global.operations, {
      operation: 'create',
      article: articleDto
    }];

    return [true, null];
  }

  update = async (article: ArticleDto): Promise<boolean> => {
    // TODO - Validate article, update markdown file and update articles.json

    // global.operations = [...global.operations, {
    //   operation: 'update',
    //   article: article
    // }];

    return false;
  }

  delete = async (article: ArticleDto): Promise<boolean> => {
    const articles = await this.getAll();
    const filteredArticles = articles.filter(({ url }) => url !== article.url);
    if (filteredArticles.length === articles.length) return false;

    try {
      await this.fileAccess.addOrUpdateFile(articlesJsonFilePath, JSON.stringify(filteredArticles, null, 2));

      const articleFilePath = `${articlesFolderPath}/${article.url}.md`;
      await this.fileAccess.deleteFile(articleFilePath);
    } catch (err) {
      return false;
    }

    global.operations = [...global.operations, {
      operation: 'delete',
      article: article
    }];

    return true;
  }
}
