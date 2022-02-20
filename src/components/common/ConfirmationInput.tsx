import React, { useState } from "react";
import { Box } from "ink";
import { Input } from './Input';

const isConfirmed = (value: string, defaultValue: boolean): boolean => {
  if (value === '') return defaultValue;
  const lowerValue = value.toLowerCase();
  return lowerValue === 'y' || lowerValue === 'yes';
}

export const ConfirmationInput = ({ defaultValue = true, promptMessage, onSubmit }: ConfirmationInputProps) => {
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const handleSubmit = (value: string) => {
    const confirmedValue = isConfirmed(value, defaultValue);
    setConfirmed(true);
    onSubmit(confirmedValue);
  }

  const y = defaultValue ? 'Y' : 'y';
  const n = defaultValue ? 'N' : 'n';
  const message = `${promptMessage} (${y}/${n})`;
  
  return (
    <Box>
      {!confirmed &&
        <Input promptMessage={message} onSubmit={handleSubmit} />
      }
    </Box>
  )
}

export interface ConfirmationInputProps {
  defaultValue: boolean;
  promptMessage: string;
  onSubmit: (confirm: boolean) => void;
}
