import { Box, Text } from "ink";
import React from "react";
import environment from "../environment/environment";
import { primary } from "../styles/colors";

export const Header = () => (
  <Box borderStyle='round'
    flexDirection='column'
    borderColor={primary[200]}
    width={50}
    alignItems='center'
    justifyContent='center'
  >
    <Text bold color={primary[500]}>The Peach Speech tool</Text>
    <Text color='gray'>{environment.repositoryUrl}</Text>
  </Box>
);
