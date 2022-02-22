import { useInput } from "ink"

export const useBack = (onBack: () => void) => {
  useInput((_, key) => {
    key.backspace && onBack();
  });
}