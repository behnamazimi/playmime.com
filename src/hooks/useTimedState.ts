import { useState, useEffect } from "react";

/**
 * A hook to manage a state that resets after a specified timeout.
 * @template T
 * @param {T} initialState - The initial value of the state. Default is `false`.
 * @param {number} resetTimeout - The time (in milliseconds) after which the state resets.
 * @returns {[T, (value: T) => void]} - A tuple containing the current state and a function to update it.
 */
export default function useTimedState<T>(
  initialState: T,
  resetTimeout: number
): [T, (value: T) => void] {
  const [state, setState] = useState<T>(initialState);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (state !== initialState) {
      timer = setTimeout(() => setState(initialState), resetTimeout);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [state, initialState, resetTimeout]);

  return [state, setState];
}
