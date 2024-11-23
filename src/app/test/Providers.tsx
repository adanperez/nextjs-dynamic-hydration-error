'use client';

import { AppProvider, AppContext } from '@/components/AppContext';
import { PropsWithChildren } from 'react';

export function Providers({ children }: PropsWithChildren) {
  return <AppProvider>{children}</AppProvider>;
}

export function ProvidersCustom({ children }: PropsWithChildren) {
  return (
    <AppContext.Provider value={{ state: 'temp', setState: () => {} }}>
      {children}
    </AppContext.Provider>
  );
}
