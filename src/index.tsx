import React, { Component, useState } from 'react';
import { Box, Text, render } from 'ink';
import { setup } from './modules/setup';
import { FileAccess } from './modules/file-access';
import { NewArticleInput } from './components/NewArticleInput';
import { Article, ArticleDto } from './models/article.model';

const main = async () => {
  const repository = await setup();
  const fileAccess = new FileAccess(repository);

  const articles = await fileAccess
    .getContent('src/assets/articles.json')
    .then(JSON.parse);
  
  // console.log(articles);

  const App = () => {
    const [articleCreated, setArticleCreated] = useState<boolean>(false);
  
    const onArticleCreated = (article: ArticleDto) => {
      setArticleCreated(true);

      // TODO - Validate article
      //  - Article URL is not duplicated
      //  - Article file path exists and it's an actual MD file
      
      // TODO - Add article object to assets/articles.json in repository
      // TODO - Copy article markdown file to assets/articles in repository
      // (Use article.url as file name)

      // TODO - Commit changes
      // TODO - Push changes to remote repository 'master' branch
    }
  
    return (
      <Box flexDirection="column">
        {!articleCreated &&
          <NewArticleInput onComplete={onArticleCreated}></NewArticleInput>
        }
      </Box>
    );
  }

  render(<App />);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});