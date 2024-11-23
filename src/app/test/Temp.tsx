'use client';
import { useAppContext } from '@/components/AppContext';
import React, { useEffect } from 'react';

export const Temp: React.FC = () => {
  const test = useAppContext();
  console.log('test', test);
  useEffect(() => {
    test.setState('home');
  });
  return (
    <div>
      <h1>Hello, this is the Temp component! - {test.state}</h1>
    </div>
  );
};
