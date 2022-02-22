import { Box, Text, useInput } from "ink"
import React, { useState } from "react"
import { useArrows } from "../../hooks/use-arrows";

export interface SelectProps {
  options: string[];
  onSelect: (optionIndex: number) => void;
}

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
        <Option key={i + 'opt'} value={option} index={i} selected={i === selected} />
      ))}
    </Box>
  );
}

interface OptionProps {
  value: string;
  index: number;
  selected: boolean;
}

const Option = ({ value, index, selected }: OptionProps) => {
  const before = selected
    ? '>> '
    : '   ';

  const [bgColor, color] = selected
    ? ['cyan', 'black']
    : ['black', 'cyan'];

  return (
    <Text key={index}>
      <Text key={index + 'tab'}>{before}</Text>
      <Text key={index + 'txt'} backgroundColor={bgColor} color={color}>{value}</Text>
    </Text>
  );
}