import React, { Component, useState } from 'react';
import { Box, Text, render } from 'ink';
import { setup } from './modules/setup';
import { FileAccess } from './modules/git/file-access';
import { NewArticleInput } from './components/NewArticleInput';
import { ArticleDto } from './models/article.model';

const main = async () => {
  try {
    
    const manager = await setup();
    const fileAccess = new FileAccess();

    // await createArticle(fileAccess, {
    //   title: 'Test article 2',
    //   oneliner: 'Integration tool testing article',
    //   url: 'article-2',
    //   tags: ['test', 'integration'],
    //   filePath: path.join(__dirname, '..', 'mock', 'article.md')
    // });
  } catch (error) {
    console.error(error);
  }

  const App = () => {
    const [articleCreated, setArticleCreated] = useState<boolean>(false);
  
    const onArticleCreated = async (article: ArticleDto) => {
      setArticleCreated(true);

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
    }
  
    return (
      <Box flexDirection="column">
        <NewArticleInput onComplete={onArticleCreated}></NewArticleInput>
        {articleCreated &&
          <Text color="green">Article created.</Text>
        }
      </Box>
    );
  }

  // render(<App />);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});