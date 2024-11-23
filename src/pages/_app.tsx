import { AppProvider } from '@/components/AppContext';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />{' '}
    </AppProvider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const ctx = await App.getInitialProps(context);
  return ctx;
};
