import { AppProps } from 'next/app';
import { Header } from '../components/Header';

import { Provider as NextProvider } from 'next-auth/client';

import '../styles/global.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
      <ToastContainer />
    </NextProvider>
  );
}

export default MyApp;
