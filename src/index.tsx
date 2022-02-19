import React, { Component, useState } from 'react';
import { Box, Text, render } from 'ink';
import { setup } from './modules/setup';
import { FileAccess } from './modules/file-access';

const App = () => {
  return (
    <Box flexDirection="column">
      <Text>The Peach Speech tool</Text>
    </Box>
  );
}

const main = async () => {
  const repository = await setup();
  const fileAccess = new FileAccess(repository);

  const articles = await fileAccess.getContent('src/assets/articles.json')
    .then(JSON.parse);
  
  console.log(articles);

  render(<App />);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});