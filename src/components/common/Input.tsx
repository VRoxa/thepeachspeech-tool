import React, { useState } from "react";
import { Box, Text } from "ink";
import TextInput from "ink-text-input";

export const Input = ({ promptMessage, onSubmit }: InputProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = (value: string) => {
    onSubmit(value);
    setValue('');
  }

  return (
    <Box flexDirection="row">
      <Box marginRight={1}>
        <Text>{ promptMessage }</Text>
      </Box>
      <TextInput
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}

export interface InputProps {
  promptMessage: string;
  onSubmit: (value: string) => void;
}
