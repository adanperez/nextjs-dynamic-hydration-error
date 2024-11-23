import { Suspense } from 'react';
import { Temp } from './Temp';
import { SuspendedComp } from './SuspendedComp';

export default function Home() {
  return (
    <main>
      <h1>Home</h1>
      <Temp />
      <Suspense fallback={<div>Loading...</div>}>
        <SuspendedComp />
      </Suspense>
    </main>
  );
}
