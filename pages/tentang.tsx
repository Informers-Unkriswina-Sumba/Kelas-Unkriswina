import { Box, Container, Text } from '@chakra-ui/layout';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import Layout from '../components/Layout';
import { PUBLIC_URL } from '../constant';
import { shimmer, toBase64 } from '../lib/ImageOptimization';
import Image from 'next/image';
import styles from '../styles/Tentang.module.css';

interface IProps {}

const PaketHarga: React.FC<IProps> = (): ReactElement => {
  return (
    <Layout>
      <Head>
        <meta name='og:keywords' content='Tentang Kami' />
        <meta name='og:title' content='Tentang Kami' />
        <meta property='og:site_name' content='Tentang Kami' />
        <meta
          property='og:description'
          content='Tentang Kelas Unkriswina Sumba'
        />
        <meta name='twitter:title' content='Tentang Kami' />
        <meta
          name='twitter:description'
          content='Tentang Kelas Unkriswina Sumba'
        />
        <meta property='og:url' content={`${PUBLIC_URL}`} />

        <meta name='twitter:site' content={`${PUBLIC_URL}`} />
        <meta property='og:image' content='' />
        <meta name='twitter:image:src' content='' />
        <meta property='og:image:width' content='1000' />
        <meta property='og:image:height' content='667' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:image:alt' content='Tentang Kami' />

        <title>Tentang Kami</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container px={3} mb={6}>
        <Text fontWeight='bold' color='gray.600' fontSize='x-large' mt={3}>
          Tentang Kelas Unkriswina
        </Text>
        <Text fontSize='sm' mt={3}>
          Kelas Unkriswina adalah sebuah platform yang diperuntukan kepada
          <b> Mahasiswa/i</b> Universitas Kristen Wira Wacana Sumba (UNKRISWINA)
          dalam mencari jadwal perkuliahan pada setiap Mata Kuliah yang
          ditempuh. Di Kelas Unkriswina, Mahasiswa/i dapat mencari kelas yang
          telah mereka ambil/setujuhi melalui proses KRS. Informasi kelas pada
          setiap Matakuliah yang ditampilkan di kelas unkriswina mengikuti
          dengan informasi kelas yang disediakan oleh pihak kampus dimana sudah
          tertuangan dalam KRS.
        </Text>
        <Text fontSize='sm' mt={3}>
          Keunggulan dari Kelas Unkriswina, Mahasiswa/i dapat dengan mudah
          mencari informasi kelas yang ingin mereka dapatkan, informasi kelas
          yang ditampilkan sangatlah lengkap bahkan ada yang tidak terterai di
          KRS seperti, link Whatsapp group kelas, link Classroom kelas, link
          Google meet kelas, link Zoom meeting kelas, dan fitur-fitur menarik
          lainnya seperti <b>Kelas saya</b> (segera) <b>Filter canggih</b>{' '}
          (segera) yang tidak dapat ditemukan oleh Mahasiswa/i Ukriswina Sumba
          di masa yang sebelumnya
        </Text>
        <Text fontSize='sm' mt={3}>
          Kelas Unkriswina juga hadir untuk menumbuhkan sikap-sikap
          <b> Berwirausaha</b> bagi Mahasiswa/i Program Studi Teknik Informatika
          Universitas Kristen Wira Wacana Sumba dalam membuat Sistem Informasi
          yang berbayar & digunakan pada lingkungan Kampus.
        </Text>
        <Box shadow='2xl' my={6}>
          <Image
            src='/images/logo-unkriswina-sumba-512.jpg'
            alt='Logo Unkriswina Sumba'
            width='600'
            className={styles.imgLogo}
            height='550'
            priority
            placeholder='blur'
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 700)
            )}`}
          />
        </Box>
        <Text fontWeight='bold' color='gray.600' fontSize='x-large' mt={3}>
          Dibuat oleh: HMTI UKRISWINA SUMBA
        </Text>
      </Container>
    </Layout>
  );
};

export default PaketHarga;
