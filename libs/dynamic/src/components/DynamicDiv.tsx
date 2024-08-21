import dynamic from 'next/dynamic';

export const DynamicDiv = dynamic(() => import('./Div'), {
  // loading: () => <p>Loading...</p>,
});
