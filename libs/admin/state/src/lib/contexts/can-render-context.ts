import { createContext, useContext } from 'react';

interface CanRenderContextProps {
  canRender: boolean;
}

export const CanRenderContext = createContext<CanRenderContextProps | null>(
  null,
);

export const useCanRenderContext = () => {
  const context = useContext(CanRenderContext);
  if (context === null) {
    throw new Error(
      'useCanRenderContext must be used within a CanRenderContextProvider',
    );
  }

  return context;
};
