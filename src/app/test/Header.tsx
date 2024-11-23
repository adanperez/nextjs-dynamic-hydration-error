'use client';
import { useAppContext } from '@/components/AppContext';
import React from 'react';

export const Header: React.FC = () => {
  const test = useAppContext();
  console.log('Header', test);
  return <h1>Welcome to My Website {test.state}</h1>;
};
