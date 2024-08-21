import dynamic from 'next/dynamic';

export const DynamicHeader = dynamic(() => import('./Header'), {
  // loading: () => <p>Loading...</p>,
});
