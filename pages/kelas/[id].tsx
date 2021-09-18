import { Box, Container, Text, Divider } from '@chakra-ui/layout';
import { Skeleton, SkeletonText } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import { PUBLIC_URL } from '../../constant';
import { IClass } from '../../interface/IClass';
import { actionSetDataClass } from '../../provider/redux/ClassData/ClassDataActions';
import { IClassDataState } from '../../provider/redux/ClassData/ClassDataReducer';
import { ICombinedState } from '../../provider/redux/store';
import styles from '../../styles/KelasDetail.module.css';
import Image from 'next/image';
import { IoLogoWhatsapp } from 'react-icons/io';
import { SiGooglehangoutsmeet } from 'react-icons/si';
import { SiGoogleclassroom } from 'react-icons/si';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';
import { BsBuilding } from 'react-icons/bs';
import { ImQrcode } from 'react-icons/im';
import SkeletonItemInfoKelas from '../../components/SkeletonItemInfoKelas';
import SkeletonItemLinkKelas from '../../components/SkeletonItemLinkKelas';
import ClassLinkItem from '../../components/ClassLinkItem';
import ClassInfoItem from '../../components/ClassInfoItem';
import { shimmer, toBase64 } from '../../lib/ImageOptimization';

interface IProps {}
interface IReduxState {
  allClass: IClassDataState;
}

const KelasDetail: React.FC<IProps> = (): ReactElement => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id }: any = router.query;
  const [loading, setLoading] = useState<boolean>(false);
  const [kelas, setKelas] = useState<IClass>();
  const { allClass } = useSelector<ICombinedState, IReduxState>((state) => {
    return {
      allClass: state.allClass,
    };
  });

  const handleGetClassDetail = (): void => {
    setLoading(true);
    const resultClass = allClass.allClass.filter(
      (kelas: IClass) => kelas.id === id
    );
    if (resultClass.length > 0) {
      setKelas(resultClass[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    async function funcAsycnDefault() {
      setLoading(true);
      if (allClass.allClass.length < 1) {
        await dispatch(actionSetDataClass());
      }
      setLoading(false);
    }
    funcAsycnDefault();
  }, []);

  useEffect(() => {
    handleGetClassDetail();
  }, [allClass, router.query]);

  return (
    <Layout>
      <Head>
        <meta
          name='og:keywords'
          content={`Kelas ${kelas?.nama_matakuliah} ${kelas?.kelas}`}
          // content=''
        />
        <meta
          name='og:title'
          content={`Kelas ${kelas?.nama_matakuliah} ${kelas?.kelas}`}
          // content=''
        />
        <meta
          property='og:site_name'
          content={`Kelas ${kelas?.nama_matakuliah} ${kelas?.kelas}`}
          // content=''
        />
        <meta
          property='og:description'
          content={`Kelas ${kelas?.nama_matakuliah} ${kelas?.kelas} Semester ${kelas?.semester} ${kelas?.program_studi} ${kelas?.fakultas}`}
          // content=''
        />
        <meta name='twitter:title' content='Cari Kelas Unkriswina' />
        <meta
          name='twitter:description'
          content={`Kelas ${kelas?.nama_matakuliah} ${kelas?.kelas} Semester ${kelas?.semester} ${kelas?.program_studi} ${kelas?.fakultas}`}
          // content=''
        />
        <meta property='og:url' content={`${PUBLIC_URL}`} />

        <meta name='twitter:site' content={`${PUBLIC_URL}`} />
        <meta property='og:image' content='' />
        <meta name='twitter:image:src' content='' />
        <meta property='og:image:width' content='1000' />
        <meta property='og:image:height' content='667' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:image:alt'
          content={`Kelas ${kelas?.nama_matakuliah} ${kelas?.kelas}`}
          // content=''
        />

        <title>{`Kelas ${kelas?.nama_matakuliah} ${kelas?.kelas}`}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container px={3} mb={6}>
        {loading || kelas === undefined ? (
          <Container>
            <Skeleton width='600' height='250' />
            <SkeletonText mt='2' noOfLines={4} spacing='2' />
            <Text fontWeight='bold' color='gray.600' mt={3}>
              Info Kelas
            </Text>
            <SkeletonItemInfoKelas />
            <SkeletonItemInfoKelas />
            <SkeletonItemInfoKelas />
            <SkeletonItemInfoKelas />
            <Text fontWeight='bold' color='gray.600' mt={3}>
              Link Kelas
            </Text>
            <SkeletonItemLinkKelas />
            <SkeletonItemLinkKelas />
            <SkeletonItemLinkKelas />
            <Text fontWeight='bold' color='gray.600' mt={3}>
              Deskripsi Kelas
            </Text>
            <SkeletonText mb='3' noOfLines={4} spacing='2' />
            <SkeletonText mb='3' noOfLines={4} spacing='2' />
            <SkeletonText mb='3' noOfLines={4} spacing='2' />
          </Container>
        ) : kelas ? (
          <Container p='0'>
            <Box shadow='2xl'>
              <Image
                src={kelas.img_url}
                alt={kelas.nama_matakuliah}
                width='600'
                className={styles.imgClass}
                height='550'
                priority
                placeholder='blur'
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 700)
                )}`}
              />
            </Box>
            <Box mt={3}>
              <Text
                fontWeight='bold'
                fontSize='x-large'
                textTransform='capitalize'
              >
                {kelas.nama_matakuliah}
              </Text>
              <Text
                fontWeight='bold'
                fontSize='large'
                color='gray.400'
                textTransform='uppercase'
              >
                {kelas.fakultas}
              </Text>
              <Text
                fontWeight='bold'
                fontSize='large'
                color='gray.400'
                textTransform='capitalize'
              >
                Semester {kelas.semester}
              </Text>
            </Box>
            <Box mt={3}>
              <Text fontWeight='bold' color='gray.600'>
                Info Kelas
              </Text>
              <Container>
                <ClassInfoItem
                  infoTitle='Dosen Pengampu'
                  infoValue={kelas.dosen_pengampu}
                  icon={<FaChalkboardTeacher size={20} />}
                />
                <ClassInfoItem
                  infoTitle='Waktu'
                  infoValue={`${kelas.hari} ${kelas.jam_mulai} ${kelas.jam_berakhir}`}
                  icon={<MdDateRange size={20} />}
                />
                <ClassInfoItem
                  infoTitle='Ruangan'
                  infoValue={kelas.ruangan}
                  icon={<BsBuilding size={20} />}
                />
                <ClassInfoItem
                  infoTitle='Kode'
                  infoValue={kelas.kode}
                  icon={<ImQrcode size={20} />}
                />
              </Container>
            </Box>
            <Box mt={3}>
              <Text fontWeight='bold' color='gray.600'>
                Link Kelas
              </Text>
              <Container>
                <ClassLinkItem
                  icon={<IoLogoWhatsapp fontSize={22} fill='#38A169' />}
                  link={kelas.whatsapp_link ?? '#'}
                />
                <Divider orientation='horizontal' />
                <ClassLinkItem
                  icon={<SiGoogleclassroom fontSize={22} fill='#48BB78' />}
                  link={kelas.classroom_link ?? '#'}
                  kode={kelas.classroom_code ?? ''}
                />
                <Divider orientation='horizontal' />
                <ClassLinkItem
                  icon={<SiGooglehangoutsmeet fontSize={22} fill='#276749' />}
                  link={kelas.zoom_meeting_link ?? '#'}
                  kode={kelas.zoom_meeting_code ?? ''}
                />
                <Divider orientation='horizontal' />
                <ClassLinkItem
                  icon={<SiGooglehangoutsmeet fontSize={22} fill='#3182CE' />}
                  link={kelas.google_meet_link ?? '#'}
                />
                <Divider orientation='horizontal' />
              </Container>
            </Box>
            <Box mt={3}>
              <Text fontWeight='bold' color='gray.600'>
                Deskripsi Kelas
              </Text>
              <Container>
                <Text fontSize='sm' textAlign='justify' mb={1}>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Accusamus ipsam pariatur, provident dicta quos perspiciatis
                  adipisci sed architecto qui itaque, consequuntur eius minima
                  reprehenderit vitae, quasi odit. Aliquid, quam blanditiis?
                </Text>
                <Text fontSize='sm' mb={1}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
                  quasi commodi iste doloremque ab numquam incidunt quod, minus
                  cupiditate, ut esse dicta dolorem nam fuga nisi quisquam.
                  Nesciunt, tempora placeat!
                </Text>
                <Text fontSize='sm' mb={1}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Tempore quibusdam, repellat culpa soluta dicta debitis iste
                  fugit inventore itaque cupiditate eius officia placeat
                  dignissimos! Similique molestiae dolore doloremque sit omnis?
                </Text>
              </Container>
            </Box>
          </Container>
        ) : (
          <Text>Kelas tidak ditemukan</Text>
        )}
      </Container>
    </Layout>
  );
};

export default KelasDetail;
