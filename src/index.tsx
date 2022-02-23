import React, { Component, useState } from 'react';
import { Box, Text, render } from 'ink';
import { setup } from './modules/setup';
import { FileAccess } from './modules/git/file-access';
import { NewArticleInput } from './components/NewArticleInput';
import { ArticleDto } from './models/article.model';
import { ArticlesService } from './modules/articles/articles-service';
import path from 'path';
import { createCommit } from './modules/git/create-commit';
import { MainMenu } from './components/MainMenu';
import { Exit } from './components/common/Exit';

const main = async () => {
  try {
    
    // const manager = await setup();
    // const fileAccess = new FileAccess();
    // const service = new ArticlesService(fileAccess);

    // const article: ArticleDto = {
    //   title: 'Test article 3',
    //   oneliner: 'Integration tool testing article',
    //   url: 'article-3',
    //   tags: ['test', 'integration'],
    //   filePath: path.join(__dirname, '..', 'mock', 'article.md')
    // }
    
    // const articles = await service.getArticles();
    // console.log(articles);

    // const created = await service.addArticle(article);
    // if (created) {
    //   console.log(`Article ${article.title} created`);
    //   await createCommit(`Upload article ${article.url}`);
    // }

    // await manager.push();
  } catch (error) {
    console.error(error);
  }

  const App = () => {
    // TODO - Validate article
    //  - Article URL is not duplicated
    //  - Article file path exists and it's an actual MD file
    
    // TODO - Add article object to assets/articles.json in repository
    // TODO - Copy article markdown file to assets/articles in repository
    // (Use article.url as file name)

    // TODO - Commit changes
    // TODO - Push changes to remote repository 'master' branch

    // await createArticle(fileAccess, article);

    // const articls = await fileAccess.getContent('src/assets/articles.json')
    //   .then(content => JSON.parse(content));

    // console.log('updated articles', articls);

    // const content = await fileAccess.getContent('src/assets/articles/' + article.url + '.md');

    // console.log('article content', content);
    // }
  
    return (
      <>
        <MainMenu />
        <Exit />
      </>
    );
  }

  render(<App />);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});