import { Box, Text, useInput } from "ink"
import React, { useState } from "react"
import { useArrows } from "../../hooks/use-arrows";
import { primary } from "../../styles/colors";

export const Select = ({ options, onSelect }: SelectProps) => {
  const [selected, setSelected] = useState(0);
  const { length } = options;

  useInput((_, key) => {
    if (key.return) {
      onSelect(selected);
    }
  });

  useArrows({
    onUp: () => setSelected((selected + length - 1) % length),
    onDown: () => setSelected((selected + 1) % length)
  });

  return (
    <Box flexDirection="column">
      {options.map((option, i) => (
        <Box marginY={0.5} key={i + 'opt'}>
          <Option
            value={option}
            index={i}
            selected={i === selected}
          />
        </Box>
      ))}
    </Box>
  );
}

export interface SelectProps {
  options: string[];
  onSelect: (optionIndex: number) => void;
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
