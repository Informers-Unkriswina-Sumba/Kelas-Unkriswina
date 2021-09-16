import Head from 'next/head';
import React, { ReactNode } from 'react';
import { Chakra } from '../../Chakra';
import Header from '../Header';

interface IProps {
  children: ReactNode;
  cookies?: string;
}

interface IProps {}

const Layout: React.FC<IProps> = (props) => {
  return (
    <Chakra cookies={props.cookies}>
      <div>
        <Head>
          {/* Favicon Icon */}
          <link rel='icon' href='/favicon.ico' />

          <meta name='theme-color' content='#D53F8C' />

          <meta property='og:type' content='website' />

          {/* <meta
          name='google-site-verification'
          content='ou8SFQ1GL_Y2KaAsYebqCH7UF3ICgauDWGzXT0Gooio'
        /> */}
        </Head>
        <Header />
        <main
          style={{
            minHeight: '100vh',
          }}
        >
          {props.children}
        </main>
      </div>
    </Chakra>
  );
};

export default Layout;
export { getServerSideProps } from '../../Chakra';
