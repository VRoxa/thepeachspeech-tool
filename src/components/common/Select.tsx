import { Box, Text, useInput } from "ink"
import React, { useState } from "react"
import { useArrows } from "../../hooks/use-arrows";
import { primary } from "../../styles/colors";

export const Select = <T extends {}>({ elements, render, onSelect }: SelectProps<T>) => {
  const [selected, setSelected] = useState(0);
  const { length } = elements;

  useInput((_, key) => {
    if (key.return) {
      // On select callback is defined
      !!onSelect &&
      onSelect(elements[selected], selected);
    }
  });

  useArrows({
    onUp: () => setSelected((selected + length - 1) % length),
    onDown: () => setSelected((selected + 1) % length)
  });
  
  return (
    <Box flexDirection="column">
      {elements.map((element, i) => 
        <Box marginY={0.5} key={i + 'opt'}>
          {render(element, i === selected, i)}
        </Box>
      )}
    </Box>
  );
}

export interface SelectProps<T extends {}> {
  elements: T[];
  render: (element: T, selected: boolean, index: number) => JSX.Element;
  onSelect?: (element: T, index: number) => void;
}

const Option = ({ value, selected }: OptionProps) => {
  const before = selected ? '◽' : '  ';
  const color = selected ? primary[500] : primary[200];

  return (
    <Text>
      <Text>{before}</Text>
      <Text color={color}>{value}</Text>
    </Text>
  );
}

interface OptionProps {
  value: string;
  index: number;
  selected: boolean;
}
