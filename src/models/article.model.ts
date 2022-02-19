
export interface Article {
  title: string;
  oneliner: string;
  url: string;
  tags: string[];
  date: Date;
}

export interface ArticleDto extends Partial<Article> {
  filePath?: string;
}
