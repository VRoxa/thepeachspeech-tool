import { Article, ArticleDto } from "../../models/article.model";
import { ArticleValidator } from "./article-validator";
import { FileAccess } from "../git/file-access";
import fs from 'fs';

type RawArticle = Omit<Article, 'date'> & { date: string };

const readContent = (filePath: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'utf8' }, (err, content) => {
      !!err ? reject(err) : resolve(content);
    });
  });
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

  getArticles = async (): Promise<Article[]> => {
    const articlesJson = await this.fileAccess.getContent(articlesJsonFilePath);
    const articles: RawArticle[] = JSON.parse(articlesJson);
    return articles.map(article => ({
      ...article,
      date: new Date(article.date)
    }));
  }

  addArticle = async (articleDto: ArticleDto): Promise<[boolean, string]> => {
    // Validate article DTO
    const [valid, error] = this.validator.validate(articleDto);
    if (!valid) {
      return [false, error];
    }

    // Check if article markdown file exists.
    let articles = await this.getArticles();
    const isDuplicated = articles.some(({ url }) => url === articleDto.url);
    if (isDuplicated) {
      return [false, `Article '${articleDto.url}' already exists`];
    }

    // Extract article from ArticleDto
    let { filePath, ...article } = articleDto;
    article = {...article, date: new Date() } as Required<Article>;

    // Update articles.json file
    articles = [...articles, articleDto as Required<Article>];
    await this.fileAccess.addOrUpdateFile(articlesJsonFilePath, JSON.stringify(articles, null, 2));
    
    // Upload article markdown file
    const articleFilePath = `${articlesFolderPath}/${articleDto.url}.md`;
    const articleContent = await readContent(filePath);
    await this.fileAccess.addOrUpdateFile(articleFilePath, articleContent);
  
    return [true, null];
  }

  updateArticle = async (article: ArticleDto): Promise<boolean> => {
    // TODO - Validate article, update markdown file and update articles.json
    return false;
  }

  deleteArticle = async (article: ArticleDto): Promise<boolean> => {
    const articles = await this.getArticles();
    const filteredArticles = articles.filter(({ url }) => url !== article.url);
    if (filteredArticles.length === articles.length) return false;

    try {
      await this.fileAccess.addOrUpdateFile(articlesJsonFilePath, JSON.stringify(filteredArticles, null, 2));

      const articleFilePath = `${articlesFolderPath}/${article.url}.md`;
      await this.fileAccess.deleteFile(articleFilePath);
    } catch (err) {
      return false;
    }

    return true;
  }
}
