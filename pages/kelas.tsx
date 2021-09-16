import { Box, Container, Text } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { stringifyUrl } from 'query-string';
import React, { useEffect, useState, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import {
  LIST_FAKULTAS,
  PUBLIC_URL,
  IS_SEMESTER_GANJIL,
  LIST_SEMESTER_GANJIL,
  LIST_SEMESTER_GENAP,
  LIST_PROGRAM_STUDI,
} from '../constant';
import { IFilterFakultasType, IFilterProgramStudiType } from '../interface';
import { actionSetDataClass } from '../provider/redux/ClassData/ClassDataActions';
import { IClassDataState } from '../provider/redux/ClassData/ClassDataReducer';
import { ICombinedState } from '../provider/redux/store';
import styles from '../styles/Home.module.css';

interface IProps {}
interface IReduxState {
  allClass: IClassDataState;
}

const queryParams =
  typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search)
    : new URLSearchParams('');

const Kelas: React.FC<IProps> = (): ReactElement => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [paramsKodeFakultas, setParamsKodeFakultas] = useState<string>(
    queryParams?.get('fakultas')?.toLocaleLowerCase() ?? ''
  );
  const [paramsSemester, setParamsSemester] = useState<number>(
    Number(queryParams.get('semester')) ?? 0
  );
  const [paramsProgramStudi, setParamsProgramStudi] = useState<string>(
    queryParams.get('programstudi')?.toLocaleLowerCase() ?? ''
  );
  const [paramsMataKuliah, setParamsMataKuliah] = useState<string>(
    queryParams.get('matakuliah')?.toLocaleLowerCase() ?? ''
  );
  const [fakultasSelected, setFakultasSelected] =
    useState<IFilterFakultasType>();
  const [programStudiSelected, setProgramStudiSelected] =
    useState<IFilterProgramStudiType>();
  const { allClass } = useSelector<ICombinedState, IReduxState>((state) => {
    return {
      allClass: state.allClass,
    };
  });

  // Handle change state fakultas
  const handleChangeFakultas = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    if (event.target.value) {
      // selected fakultas
      const tempSelectedFakultas = LIST_FAKULTAS.filter(
        (fakultas: IFilterFakultasType) =>
          fakultas.kode.toLocaleLowerCase() ===
          event.target.value.toLocaleLowerCase()
      );
      if (tempSelectedFakultas.length > 0) {
        setFakultasSelected(tempSelectedFakultas[0]);
        setParamsKodeFakultas(tempSelectedFakultas[0].kode.toLocaleLowerCase());
        handleSetQueryParams(
          'fakultas',
          tempSelectedFakultas[0].kode.toLocaleLowerCase()
        );
      }
    } else {
      // clear selected fakultas
      setFakultasSelected(undefined);
      setParamsKodeFakultas('');
      handleSetQueryParams('fakultas', '');
    }
  };

  // Handle change state semester
  const handleChangeSemester = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    if (event.target.value) {
      // selected fakultas
      const usedSemester = IS_SEMESTER_GANJIL
        ? LIST_SEMESTER_GANJIL
        : LIST_SEMESTER_GENAP;
      const tempSelectedSemester = usedSemester.filter(
        (semester: number) => semester === Number(event.target.value)
      );
      if (tempSelectedSemester.length > 0) {
        setParamsSemester(tempSelectedSemester[0]);
        handleSetQueryParams('semester', tempSelectedSemester[0]);
      }
    } else {
      // clear selected fakultas
      setParamsSemester(0);
      handleSetQueryParams('semester', '');
    }
  };

  // Handle change state program studi
  const handleChangeProgramStudi = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    if (event.target.value) {
      // selected fakultas
      const tempSelectedProgramStudi = LIST_PROGRAM_STUDI.filter(
        (programStudi: IFilterProgramStudiType) =>
          programStudi.key.toLocaleLowerCase() ===
          event.target.value.toLocaleLowerCase()
      );
      if (tempSelectedProgramStudi.length > 0) {
        setProgramStudiSelected(tempSelectedProgramStudi[0]);
        setParamsProgramStudi(
          tempSelectedProgramStudi[0].key.toLocaleLowerCase()
        );
        handleSetQueryParams(
          'programstudi',
          tempSelectedProgramStudi[0].key.toLocaleLowerCase()
        );
      }
    } else {
      // clear selected fakultas
      setProgramStudiSelected(undefined);
      setParamsProgramStudi('');
      handleSetQueryParams('programstudi', '');
    }
  };

  const handleProcessQueryParams = (): void => {
    console.log('paramsKodeFakultas', paramsKodeFakultas);
    console.log('paramsSemester', paramsSemester);
    console.log('paramsProgramStudi', paramsProgramStudi);
    console.log('paramsMataKuliah', paramsMataKuliah);
  };

  // Handle set query parameters url search
  const handleSetQueryParams = (key: string, value: string | number): void => {
    const newPathname = stringifyUrl({
      url: router.pathname,
      query: {
        ...router.query,
        [key]: value,
      },
    });
    const newAsPath = stringifyUrl({
      url: router.asPath,
      query: {
        ...router.query,
        [key]: value,
      },
    });
    router.replace(newPathname, newAsPath);
  };

  useEffect(() => {
    if (allClass.allClass.length < 1) {
      dispatch(actionSetDataClass());
    }

    handleProcessQueryParams();
  }, []);

  return (
    <Layout>
      <Head>
        <meta name='og:keywords' content='Cari Kelas Unkriswina' />
        <meta name='og:title' content='Cari Kelas Unkriswina' />
        <meta property='og:site_name' content='Cari Kelas Unkriswina' />
        <meta
          property='og:description'
          content='Website yang menampilkan seluruh informasi penjadwalan kelas mata kuliah di Unkriswina Sumba Pada tiap Tahun Ajaran'
        />
        <meta name='twitter:title' content='Cari Kelas Unkriswina' />
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
        <meta name='twitter:image:alt' content='Cari Kelas Unkriswina' />

        <title>Cari Kelas Unkriswina</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container px={3}>
        {/* Dropdown menu fakultas */}
        <Box mt={4} mb={4}>
          <Text fontWeight='bold'>Fakultas</Text>
          <Select
            fontSize='14'
            placeholder='Pilih fakultas'
            onChange={handleChangeFakultas}
          >
            {LIST_FAKULTAS.map((fakultas: IFilterFakultasType, key: number) => (
              <option value={fakultas.kode} key={key}>
                {fakultas.label}
              </option>
            ))}
          </Select>
        </Box>
        {/* Dropdown menu semester */}
        <Box mb={4}>
          <Text fontWeight='bold'>Semester</Text>
          <Select
            fontSize='14'
            placeholder='Pilih Semester'
            onChange={handleChangeSemester}
          >
            {IS_SEMESTER_GANJIL
              ? LIST_SEMESTER_GANJIL.map((semester: number) => (
                  <option value={semester} key={semester}>
                    {semester}
                  </option>
                ))
              : LIST_SEMESTER_GENAP.map((semester: number) => (
                  <option value={semester} key={semester}>
                    {semester}
                  </option>
                ))}
          </Select>
        </Box>
        {/* Dropdown menu semester */}
        <Box mb={4}>
          <Text fontWeight='bold'>Program Studi</Text>
          <Select
            fontSize='14'
            placeholder='Pilih Program Studi'
            onChange={handleChangeProgramStudi}
          >
            {LIST_PROGRAM_STUDI.map(
              (programStudi: IFilterProgramStudiType, key: number) => (
                <option value={programStudi.key} key={key}>
                  {programStudi.label}
                </option>
              )
            )}
          </Select>
        </Box>
      </Container>
      <Text fontWeight='bold' fontSize='xx-large' align='center' mt={6}>
        Data Matakuliah Masih Dalam Proses Perundingan
      </Text>
    </Layout>
  );
};

export default Kelas;
