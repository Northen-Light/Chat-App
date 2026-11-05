import { createContext, useContext } from 'react';

export function createSafeContext<T>(name: string) {
  const Context = createContext<T | null>(null);
  Context.displayName = name;

  function useSafeContext() {
    const value = useContext(Context);
    if (value === null) {
      throw new Error(`use${name} must be used with use${name}Provider`);
    }
    return value;
  }

  return [Context, useSafeContext] as const;
}
