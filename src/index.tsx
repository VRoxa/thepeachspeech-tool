import React, { Component, useState } from 'react';
import { Box, Text, render } from 'ink';

const App = () => {
  return (
    <Box flexDirection="column">
      <Text>The Peach Speech tool</Text>
    </Box>
  );
}

try {

  render(<App />);

} catch (err) {
  console.error(err);
  process.exit(1);
}
