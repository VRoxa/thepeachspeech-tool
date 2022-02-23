import React, { useEffect, useState } from "react";
import { Box, Text } from "ink";
import TextInput from "ink-text-input";
import { accent } from "../../styles/colors";
import { global } from "../../environment/global";

export const Input = ({ promptMessage, onSubmit }: InputProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = (currentValue: string) => {
    setValue('');
    onSubmit(currentValue);
  }

  useEffect(() => {
    global.backEnabled = false;
    return () => { global.backEnabled = true }
  }, []);

  return (
    <Box flexDirection="row" marginTop={1}>
      <Box marginRight={1}>
        <Text color={accent[500]}>{promptMessage}</Text>
      </Box>
      <TextInput
        value={value}
        onChange={setValue}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export interface InputProps {
  promptMessage: string;
  onSubmit: (value: string) => void;
}
