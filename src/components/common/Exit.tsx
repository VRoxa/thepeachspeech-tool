import React from "react";
import { Text, useApp, useInput } from 'ink';

export const Exit = () => {
  const { exit } = useApp();

  useInput((_, key) => {
    key.escape && exit();
  });
  
  return <Text color="gray">Press escape to exit.</Text>;
}