import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClassCriteriaSection from '../components/ClassCriteriaSection';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import PopulerClassSection from '../components/PopulerClassSection';
import { PUBLIC_URL } from '../constant';
import { actionSetDataClass } from '../provider/redux/ClassData/ClassDataActions';
import { IClassDataState } from '../provider/redux/ClassData/ClassDataReducer';
import { ICombinedState } from '../provider/redux/store';
import styles from '../styles/Home.module.css';
interface IReduxState {
  allClass: IClassDataState;
}

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const { allClass } = useSelector<ICombinedState, IReduxState>((state) => {
    return {
      allClass: state.allClass,
    };
  });

  console.log('allClass', allClass);
  useEffect(() => {
    if (allClass.allClass.length < 1) {
      dispatch(actionSetDataClass());
    }
  }, []);

  return (
    <Layout>
      <Head>
        <meta name='og:keywords' content='Kelas Unkriswina' />
        <meta name='og:title' content='Kelas Unkriswina' />
        <meta property='og:site_name' content='Kelas Unkriswina' />
        <meta
          property='og:description'
          content='Website yang menampilkan seluruh informasi penjadwalan kelas mata kuliah di Unkriswina Sumba Pada tiap Tahun Ajaran'
        />
        <meta name='twitter:title' content='Kelas Unkriswina' />
        <meta
          name='twitter:description'
          content='Website yang menampilkan seluruh informasi penjadwalan kelas mata kuliah di Unkriswina Sumba Pada tiap Tahun Ajaran'
        />
        <meta property='og:url' content={`${PUBLIC_URL}`} />

        <meta name='twitter:site' content={`${PUBLIC_URL}`} />
        <meta property='og:image' content='' />
        <meta name='twitter:image:src' content='' />
        <meta property='og:image:width' content='1000' />
        <meta property='og:image:height' content='667' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:image:alt' content='Kelas Unkriswina' />

        <title>Kelas Unkriswina</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div>
        <Hero />
        <ClassCriteriaSection />
        <PopulerClassSection />
        {allClass.allClass.length > 0
          ? 'Database conected'
          : "Database can't conected"}
      </div>
    </Layout>
  );
};

export default Home;
