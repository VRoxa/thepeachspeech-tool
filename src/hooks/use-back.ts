import { useInput } from "ink"
import { global } from '../environment/global';

export const useBack = (onBack: () => void) => {
  useInput((_, key) => {
    key.backspace &&
    global.backEnabled &&
    onBack();
  });
}