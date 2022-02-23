import { Box, Text } from "ink";
import React from "react";
import { primary } from "../styles/colors";

export const Header = () => (
  <Box borderStyle='round'
    borderColor={primary[200]}
    width={30}
    justifyContent='center'
  >
    <Text bold color={primary[500]}>The Peach Speech tool</Text>
  </Box>
);
