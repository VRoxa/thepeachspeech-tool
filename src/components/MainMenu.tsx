import React, { useState } from "react";
import { Box, Text } from 'ink';
import { Select } from "./common/Select";
import { useBack } from "../hooks/use-back";
import { CreateArticle } from "./CreateArticle";
import { SaveChanges } from "./SaveChanges";

const options: [string, () => JSX.Element][] = [
  ['Add new article', () => <CreateArticle />],
  ['Save changes', () => <SaveChanges />]
]

export const MainMenu = () => {

  const main = (
    <Select options={options.map(([label]) => label)} onSelect={label => {
      const [_, componentFactory] = options[label];
      return setMenu(componentFactory());
    }} />
  );
  
  const [menu, setMenu] = useState(main);
  useBack(() => setMenu(main));

  return (
    <Box flexDirection="column">
      {menu}
      <Box marginTop={1}><Text color="gray">Press back to return to the main menu.</Text></Box>
    </Box>
  );
}