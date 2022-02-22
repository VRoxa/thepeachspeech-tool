import { useInput } from "ink";

export type HandlerFn = () => void;

export type UseArrowsParams = {
  onUp?: HandlerFn;
  onDown?: HandlerFn;
  onLeft?: HandlerFn;
  onRight?: HandlerFn;
}

export const useArrows = ({
  onUp,
  onDown,
  onLeft,
  onRight,
}: UseArrowsParams) => {
  useInput((_, key) => {
    if (key.upArrow && onUp) {
      onUp();
      return;
    }

    if (key.downArrow && onDown) {
      onDown();
      return;
    }

    if (key.leftArrow && onLeft) {
      onLeft();
      return;
    }
    
    if (key.rightArrow && onRight) {
      onRight();
      return;
    }
  });
}