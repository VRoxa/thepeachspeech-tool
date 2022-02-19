import React, { Component, useState } from 'react';
import { Box, Text, render } from 'ink';
import { setup } from './modules/setup';

const App = () => {
  return (
    <Box flexDirection="column">
      <Text>The Peach Speech tool</Text>
    </Box>
  );
}

const main = async () => {
  await setup();
  render(<App />);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});