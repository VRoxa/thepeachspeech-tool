import React, { useState } from "react";
import { Box, Text } from 'ink';
import { Select } from "./common/Select";
import { useBack } from "../hooks/use-back";
import { Exit } from "./common/Exit";

const options: [string, () => JSX.Element][] = [
  ['Option 1', () => (<Text>Optiondsdkjs</Text>)],
  ['Option 2', () => (<Text>Optiondsdkjs</Text>)],
  ['Option 3', () => (<Text>Optiondsdkjs</Text>)],
  ['Option 4', () => (<Text>Optiondsdkjs</Text>)],
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
      <Exit />
    </Box>
  );
}