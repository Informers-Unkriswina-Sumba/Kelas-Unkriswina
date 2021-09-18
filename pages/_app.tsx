import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '../provider/redux/store';
export interface AppRenderProps {
  pageProps: object;
  err?: Error;
  Component: NextComponentType<NextPageContext, AppRenderProps, object>;
  router: NextRouter;
}
import type { NextComponentType, NextPageContext } from 'next';
import type { NextRouter } from 'next/router';
import { FirebaseAnalytics } from '../lib/firebase/clientApp';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppRenderProps) {
  useEffect(() => {
    // Enable Analytics in Production
    if (process.env.NODE_ENV === 'production') {
      FirebaseAnalytics();
      // console.log('running analitics firebase on production mode');
    } else {
      // FirebaseAnalytics();
      // console.log('running analitics firebase on development mode');
    }
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
