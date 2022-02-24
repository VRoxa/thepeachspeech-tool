import React, { useState } from "react";
import { Box, Text } from 'ink';
import { SelectText } from "./common/SelectText";
import { useBack } from "../hooks/use-back";
import { CreateArticle } from "./CreateArticle";
import { SaveChanges } from "./SaveChanges";
import { ViewArticles } from "./ViewArticles";

const options: [string, () => JSX.Element][] = [
  ['View articles', () => <ViewArticles />],
  ['Add new article', () => <CreateArticle />],
  ['Save changes', () => <SaveChanges />],
]

export const MainMenu = () => {

  const main = (
    <SelectText elements={options.map(([label]) => label)} onSelect={label => {
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
