import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <div className="max-w-7xl mx-auto w-full h-full">
      {children}
    </div>
  );
}