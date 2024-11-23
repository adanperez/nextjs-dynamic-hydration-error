import { useAppContext } from '@/components/AppContext';
import React from 'react';
import { Header } from './Header';

export const SuspendedComp = async () => {
  const data = await fetchData();

  return (
    <div>
      <Header />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

async function fetchData() {
  // Simulate fetching data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: 'Hello from async component!' });
    }, 1000);
  });
}
