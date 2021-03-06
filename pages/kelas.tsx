import { FormErrorMessage } from '@chakra-ui/form-control';
import { Box, Container, Text } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { stringifyUrl } from 'query-string';
import React, { useEffect, useState, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardClassMataKuliah from '../components/CardClassMataKuliah';
import Layout from '../components/Layout';
import {
  LIST_FAKULTAS,
  PUBLIC_URL,
  IS_SEMESTER_GANJIL,
  LIST_SEMESTER_GANJIL,
  LIST_SEMESTER_GENAP,
  LIST_PROGRAM_STUDI,
} from '../constant';
import {
  IFilterFakultasType,
  IFilterProgramStudiType,
  IListMataKuliah,
} from '../interface';
import { IClass } from '../interface/IClass';
import { actionSetDataClass } from '../provider/redux/ClassData/ClassDataActions';
import { IClassDataState } from '../provider/redux/ClassData/ClassDataReducer';
import { ICombinedState } from '../provider/redux/store';

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
  const [paramsKodeProgramStudi, setParamsProgramStudi] = useState<string>(
    queryParams.get('programstudi')?.toLocaleLowerCase() ?? ''
  );
  const [paramsMataKuliah, setParamsMataKuliah] = useState<string>(
    queryParams.get('matakuliah')?.toLocaleLowerCase() ?? ''
  );
  const [fakultasSelected, setFakultasSelected] =
    useState<IFilterFakultasType>();
  const [programStudiSelected, setProgramStudiSelected] =
    useState<IFilterProgramStudiType>();
  const [optionsSelectedProgramStudi, setOptionsSelectedProgramStudi] =
    useState<IFilterProgramStudiType[]>([]);
  const [selectedMataKuliah, setSelectedMataKuliah] =
    useState<IListMataKuliah>();
  const [listMataKuliah, setListMataKuliah] = useState<IListMataKuliah[]>([]);
  const [listClassMataKuliah, setListClassMataKuliah] = useState<IClass[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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
      setProgramStudiSelected(undefined);
      clearStateSemester();
      clearStateMataKuliah();
      // selected fakultas
      const tempSelectedFakultas = LIST_FAKULTAS.filter(
        (fakultas: IFilterFakultasType) =>
          fakultas.kode.toLocaleLowerCase() ===
          event.target.value.toLocaleLowerCase()
      );
      if (tempSelectedFakultas.length > 0) {
        const tempListSelecterProgramStudi: IFilterProgramStudiType[] =
          LIST_PROGRAM_STUDI.filter(
            (programStudi: IFilterProgramStudiType) =>
              programStudi.kode_fakultas.toLocaleLowerCase() ===
              tempSelectedFakultas[0].kode.toLocaleLowerCase()
          );
        setFakultasSelected(tempSelectedFakultas[0]);
        setParamsKodeFakultas(tempSelectedFakultas[0].kode.toLocaleLowerCase());
        setOptionsSelectedProgramStudi(tempListSelecterProgramStudi);
        handleSetQueryParams(
          'fakultas',
          tempSelectedFakultas[0].kode.toLocaleLowerCase()
        );
      }
    } else {
      // clear selected fakultas
      clearStateFakultas();
      clearStateProgramStudi();
    }
    // clearStateProgramStudi();
    clearStateSemester();
    clearStateMataKuliah();
  };

  const clearStateFakultas = (): void => {
    setFakultasSelected(undefined);
    handleSetQueryParams('fakultas', '');
  };

  const clearStateProgramStudi = (): void => {
    setProgramStudiSelected(undefined);
    handleSetQueryParams('programstudi', '');
    setParamsProgramStudi('');
    setOptionsSelectedProgramStudi([]);
  };

  const clearStateSemester = (): void => {
    setParamsSemester(0);
    handleSetQueryParams('semester', '');
  };

  const clearStateMataKuliah = (): void => {
    setListMataKuliah([]);
    setListClassMataKuliah([]);
    setSelectedMataKuliah(undefined);
    setParamsMataKuliah('');
    handleSetQueryParams('matakuliah', '');
  };

  // Handle change state program studi
  const handleChangeProgramStudi = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    if (event.target.value) {
      clearStateSemester();
      clearStateMataKuliah();
      // selected fakultas
      const tempSelectedProgramStudi = LIST_PROGRAM_STUDI.filter(
        (programStudi: IFilterProgramStudiType) =>
          programStudi.kode_program_studi.toLocaleLowerCase() ===
          event.target.value.toLocaleLowerCase()
      );
      if (tempSelectedProgramStudi.length > 0) {
        setProgramStudiSelected(tempSelectedProgramStudi[0]);
        setParamsProgramStudi(
          tempSelectedProgramStudi[0].kode_program_studi.toLocaleLowerCase()
        );
        handleSetQueryParams(
          'programstudi',
          tempSelectedProgramStudi[0].kode_program_studi.toLocaleLowerCase()
        );
      }
    } else {
      // clear selected program studi
      setProgramStudiSelected(undefined);
      handleSetQueryParams('programstudi', '');
      setParamsProgramStudi('');
    }
  };

  // Handle change state semester
  const handleChangeSemester = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    if (event.target.value) {
      clearStateMataKuliah();
      // selected semester
      const usedSemester = IS_SEMESTER_GANJIL
        ? LIST_SEMESTER_GANJIL
        : LIST_SEMESTER_GENAP;
      const tempSelectedSemester = usedSemester.filter(
        (semester: number) => semester === Number(event.target.value)
      );
      if (tempSelectedSemester.length > 0) {
        const kodeFakultas = fakultasSelected?.kode ?? '';
        const kodeProgramStudi = programStudiSelected?.kode_program_studi ?? '';
        const allListMataKuliah = allClass.allClass.filter(
          (classMataKuliah: IClass) =>
            classMataKuliah.kode_fakultas.toLocaleLowerCase() ===
              kodeFakultas.toLocaleLowerCase() &&
            classMataKuliah.kode_program_studi.toLocaleLowerCase() ===
              kodeProgramStudi.toLocaleLowerCase() &&
            Number(classMataKuliah.semester) === tempSelectedSemester[0]
        );
        const tempListMatakuliah = allListMataKuliah
          .filter(
            (kelas: IClass, index: number, passClass: IClass[]) =>
              passClass.findIndex(
                (nextClass: IClass) =>
                  nextClass.nama_matakuliah === kelas.nama_matakuliah
              ) === index
          )
          .map((kelas: IClass) => {
            return {
              key: kelas.nama_matakuliah,
              label: kelas.nama_matakuliah,
            };
          });
        setParamsSemester(tempSelectedSemester[0]);
        setListMataKuliah(tempListMatakuliah);

        handleSetQueryParams('semester', tempSelectedSemester[0]);
      }
    } else {
      // clear selected semester
      clearStateSemester();
      setSelectedMataKuliah(undefined);
      setParamsMataKuliah('');
      handleSetQueryParams('matakuliah', '');
      setListClassMataKuliah([]);
    }
  };

  const handleProcessQueryParams = (): void => {
    let tempListMatakuliah: IListMataKuliah[] = [];

    // process query fakultas
    if (paramsKodeFakultas) {
      const tempSelectedFakultas = LIST_FAKULTAS.filter(
        (fakultas: IFilterFakultasType) =>
          fakultas.kode.toLocaleLowerCase() ===
          paramsKodeFakultas.toLocaleLowerCase()
      );
      const tempListSelecterProgramStudi: IFilterProgramStudiType[] =
        LIST_PROGRAM_STUDI.filter(
          (programStudi: IFilterProgramStudiType) =>
            programStudi.kode_fakultas.toLocaleLowerCase() ===
            tempSelectedFakultas[0].kode.toLocaleLowerCase()
        );
      setFakultasSelected(tempSelectedFakultas[0]);
      setParamsKodeFakultas(tempSelectedFakultas[0].kode.toLocaleLowerCase());
      setOptionsSelectedProgramStudi(tempListSelecterProgramStudi);
      handleSetQueryParams(
        'fakultas',
        tempSelectedFakultas[0].kode.toLocaleLowerCase()
      );
    }

    // process query program studi
    if (paramsKodeProgramStudi) {
      const tempSelectedProgramStudi = LIST_PROGRAM_STUDI.filter(
        (programStudi: IFilterProgramStudiType) =>
          programStudi.kode_program_studi.toLocaleLowerCase() ===
          paramsKodeProgramStudi.toLocaleLowerCase()
      );
      if (tempSelectedProgramStudi.length > 0) {
        setProgramStudiSelected(tempSelectedProgramStudi[0]);
        setParamsProgramStudi(
          tempSelectedProgramStudi[0].kode_program_studi.toLocaleLowerCase()
        );
        handleSetQueryParams(
          'programstudi',
          tempSelectedProgramStudi[0].kode_program_studi.toLocaleLowerCase()
        );
      }
    }

    // process query semester
    if (paramsSemester) {
      // selected semester
      const usedSemester = IS_SEMESTER_GANJIL
        ? LIST_SEMESTER_GANJIL
        : LIST_SEMESTER_GENAP;
      const tempSelectedSemester = usedSemester.filter(
        (semester: number) => semester === Number(paramsSemester)
      );
      if (tempSelectedSemester.length > 0) {
        const kodeFakultas = paramsKodeFakultas;
        const kodeProgramStudi = paramsKodeProgramStudi;

        const allListMataKuliah = allClass.allClass.filter(
          (classMataKuliah: IClass) =>
            classMataKuliah.kode_fakultas.toLocaleLowerCase() ===
              kodeFakultas.toLocaleLowerCase() &&
            classMataKuliah.kode_program_studi.toLocaleLowerCase() ===
              kodeProgramStudi.toLocaleLowerCase() &&
            Number(classMataKuliah.semester) === tempSelectedSemester[0]
        );
        tempListMatakuliah = allListMataKuliah
          .filter(
            (kelas: IClass, index: number, passClass: IClass[]) =>
              passClass.findIndex(
                (nextClass: IClass) =>
                  nextClass.nama_matakuliah === kelas.nama_matakuliah
              ) === index
          )
          .map((kelas: IClass) => {
            return {
              key: kelas.nama_matakuliah,
              label: kelas.nama_matakuliah,
            };
          });
        setParamsSemester(tempSelectedSemester[0]);
        setListMataKuliah(tempListMatakuliah);
        handleSetQueryParams('semester', tempSelectedSemester[0]);
      }
    }

    if (paramsMataKuliah) {
      const tempSelectedMataKuliah = tempListMatakuliah.filter(
        (mataKuliah: IListMataKuliah) =>
          mataKuliah.key.toLocaleLowerCase() ===
          paramsMataKuliah.toLocaleLowerCase()
      );
      if (tempSelectedMataKuliah.length > 0) {
        setSelectedMataKuliah(tempSelectedMataKuliah[0]);
        setParamsMataKuliah(tempSelectedMataKuliah[0].key.toLocaleLowerCase());
        handleSetQueryParams(
          'matakuliah',
          tempSelectedMataKuliah[0].key.toLocaleLowerCase()
        );
      }
    }

    if (
      paramsKodeFakultas &&
      paramsSemester &&
      paramsKodeProgramStudi &&
      paramsMataKuliah
    ) {
      const allListMataKuliah: IClass[] = allClass.allClass.filter(
        (classMataKuliah: IClass) =>
          classMataKuliah.kode_fakultas.toLocaleLowerCase() ===
            paramsKodeFakultas.toLocaleLowerCase() &&
          classMataKuliah.kode_program_studi.toLocaleLowerCase() ===
            paramsKodeProgramStudi.toLocaleLowerCase() &&
          Number(classMataKuliah.semester) === Number(paramsSemester) &&
          classMataKuliah.nama_matakuliah.toLocaleLowerCase() ===
            paramsMataKuliah.toLocaleLowerCase()
      );

      setListClassMataKuliah(allListMataKuliah);
    }
  };

  // Handle change state mata kuliah
  const handleChangeMataKuliah = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    if (event.target.value) {
      // selected mata kuliah
      const tempSelectedMataKuliah = listMataKuliah.filter(
        (mataKuliah: IListMataKuliah) =>
          mataKuliah.key.toLocaleLowerCase() ===
          event.target.value.toLocaleLowerCase()
      );
      if (tempSelectedMataKuliah.length > 0) {
        setSelectedMataKuliah(tempSelectedMataKuliah[0]);
        setParamsMataKuliah(tempSelectedMataKuliah[0].key.toLocaleLowerCase());
        handleSetQueryParams(
          'matakuliah',
          tempSelectedMataKuliah[0].key.toLocaleLowerCase()
        );
        const kodeFakultas = fakultasSelected?.kode ?? '';
        const kodeProgramStudi = programStudiSelected?.kode_program_studi ?? '';
        const semester = paramsSemester;
        const mataKuliah = tempSelectedMataKuliah[0].key.toLocaleLowerCase();

        const allListMataKuliah: IClass[] = allClass.allClass.filter(
          (classMataKuliah: IClass) =>
            classMataKuliah.kode_fakultas.toLocaleLowerCase() ===
              kodeFakultas.toLocaleLowerCase() &&
            classMataKuliah.kode_program_studi.toLocaleLowerCase() ===
              kodeProgramStudi.toLocaleLowerCase() &&
            Number(classMataKuliah.semester) === semester &&
            classMataKuliah.nama_matakuliah.toLocaleLowerCase() === mataKuliah
        );
        setListClassMataKuliah(allListMataKuliah);
      }
    } else {
      // clear selected mata kuliah
      setSelectedMataKuliah(undefined);
      setParamsMataKuliah('');
      handleSetQueryParams('matakuliah', '');
      setListClassMataKuliah([]);
    }
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

  const clearAllParamsState = (): void => {
    // const newPathname = stringifyUrl({
    //   url: '',
    //   query: {},
    // });
    // const newAsPath = stringifyUrl({
    //   url: '',
    //   query: {},
    // });
    // router.replace(newPathname, newAsPath);
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
    return () => clearAllParamsState();
  }, []);

  useEffect(() => {
    handleProcessQueryParams();
  }, [allClass]);

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

      <Container px={3} mb={6}>
        {loading ? (
          <></>
        ) : (
          <>
            {/* Dropdown menu fakultas */}
            <Box mt={4} mb={4}>
              <Text fontWeight='bold'>Fakultas</Text>
              {fakultasSelected === undefined && (
                <Text fontSize='xs' color='red.600'>
                  Kamu belum pilih fakultas
                </Text>
              )}
              <Select
                fontSize='14'
                placeholder='Pilih fakultas'
                onChange={handleChangeFakultas}
                value={fakultasSelected?.kode}
              >
                {LIST_FAKULTAS.map(
                  (fakultas: IFilterFakultasType, key: number) => (
                    <option value={fakultas.kode} key={key}>
                      {fakultas.label}
                    </option>
                  )
                )}
              </Select>
            </Box>
            {/* Dropdown menu program studi */}
            <Box mb={4}>
              <Text fontWeight='bold'>Program Studi</Text>
              {programStudiSelected === undefined && (
                <Text fontSize='xs' color='red.600'>
                  Kamu belum pilih program studi
                </Text>
              )}
              <Select
                fontSize='14'
                placeholder='Pilih Program Studi'
                onChange={handleChangeProgramStudi}
                value={programStudiSelected?.kode_program_studi}
              >
                {optionsSelectedProgramStudi.map(
                  (programStudi: IFilterProgramStudiType, key: number) => (
                    <option value={programStudi.kode_program_studi} key={key}>
                      {programStudi.label}
                    </option>
                  )
                )}
              </Select>
            </Box>
            {/* Dropdown menu semester */}
            <Box mb={4}>
              <Text fontWeight='bold'>Semester</Text>
              {paramsSemester === 0 && (
                <Text fontSize='xs' color='red.600'>
                  Kamu belum pilih semester
                </Text>
              )}
              <Select
                fontSize='14'
                placeholder='Pilih Semester'
                onChange={handleChangeSemester}
                value={paramsSemester}
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
            {/* Dropdown menu mata kuliah */}
            {listMataKuliah.length > 0 && (
              <Box mb={4}>
                <Text fontWeight='bold'>Mata Kuliah</Text>
                {selectedMataKuliah === undefined && (
                  <Text fontSize='xs' color='orange.600'>
                    Kamu belum pilih mata kuliah
                  </Text>
                )}
                <Select
                  fontSize='14'
                  placeholder='Pilih Mata Kuliah'
                  onChange={handleChangeMataKuliah}
                  value={selectedMataKuliah?.key}
                >
                  {listMataKuliah.map(
                    (mataKuliah: IListMataKuliah, key: number) => (
                      <option value={mataKuliah.key} key={key}>
                        {mataKuliah.label}
                      </option>
                    )
                  )}
                </Select>
              </Box>
            )}
          </>
        )}
      </Container>
      <Container px={3}>
        {listClassMataKuliah.map((classMataKuliah: IClass, index: number) => (
          <CardClassMataKuliah key={index} classMataKuliah={classMataKuliah} />
        ))}
      </Container>
      <Text fontWeight='bold' fontSize='x-large' align='center' mt={6}>
        Data Matakuliah Masih Dalam Proses Perundingan
      </Text>
    </Layout>
  );
};

export default Kelas;
