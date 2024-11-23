import { useAppContext } from '@/components/AppContext';
import { Everything } from '@test/dynamic';
import { useEffect } from 'react';

export default function Home() {
  const test = useAppContext();
  console.log('test', test);
  useEffect((effect) => {
    test.setState('home');
  });
  return (
    <div>
      <h1>Home - {test.state}</h1>
      <Everything />
    </div>
  );
}
