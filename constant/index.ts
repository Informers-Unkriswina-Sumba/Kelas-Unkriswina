import { ENUM_FAKULTAS, ENUM_KODE_FAKULTAS, ENUM_PROGRAM_STUDI } from "../enum"
import { IFilterFakultasType, IFilterProgramStudiType, IRouteApp } from "../interface"

export const PUBLIC_URL= 'https://kelasunkriswina.vercel.app/'

export const LIST_FAKULTAS:IFilterFakultasType[] = [
  {
    key: ENUM_FAKULTAS.SAINS_DAN_TEKNOLOGI,
    label: 'Fakultas Sains dan Teknologi',
    kode: ENUM_KODE_FAKULTAS.FST,  
  },
  {
    key: ENUM_FAKULTAS.EKONOMI_BISNIS_DAN_HUMANIORA,
    label: 'Fakultas Ekonomi, Bisnis dan Humaniora',
    kode: ENUM_KODE_FAKULTAS.FEBH,  
  },
  {
    key: ENUM_FAKULTAS.KEGURUAN_DAN_ILMU_PENDIDIKAN,
    label: 'Fakultas Keguruan dan Ilmu Pendidikan',
    kode: ENUM_KODE_FAKULTAS.FKIP,  
  },
];

export const LIST_PROGRAM_STUDI:IFilterProgramStudiType[] = [
  {
    key: ENUM_PROGRAM_STUDI.TEKNIK_INFORMATIKA,
    label: 'Prodi Teknik Informatika',
    kode_fakultas: ENUM_KODE_FAKULTAS.FST,
  },
  {
    key: ENUM_PROGRAM_STUDI.TEKNIK_INFORMATIKA,
    label: 'Prodi Teknik Informatika',
    kode_fakultas: ENUM_KODE_FAKULTAS.FST,
  },
  {
    key: ENUM_PROGRAM_STUDI.PETERNAKAN,
    label: 'Prodi Peternakan',
    kode_fakultas: ENUM_KODE_FAKULTAS.FST,
  },
  {
    key: ENUM_PROGRAM_STUDI.AGROTEKNOLOGI,
    label: 'Prodi Agroteknologi',
    kode_fakultas: ENUM_KODE_FAKULTAS.FST,
  },
  {
    key: ENUM_PROGRAM_STUDI.AGRIBISNIS,
    label: 'Prodi Agribisnis',
    kode_fakultas: ENUM_KODE_FAKULTAS.FST,
  },
  {
    key: ENUM_PROGRAM_STUDI.TEKNOLOGI_HASIL_PERIKANAN,
    label: 'Prodi Teknologi Hasil Perikanan',
    kode_fakultas: ENUM_KODE_FAKULTAS.FST,
  },
  {
    key: ENUM_PROGRAM_STUDI.MANAJEMEN,
    label: 'Prodi Manajemen',
    kode_fakultas: ENUM_KODE_FAKULTAS.FEBH,
  },
  {
    key: ENUM_PROGRAM_STUDI.EKONOMI_PEMBANGUNAN,
    label: 'Prodi Ekonomi Pembangunan',
    kode_fakultas: ENUM_KODE_FAKULTAS.FEBH,
  },
  {
    key: ENUM_PROGRAM_STUDI.ILMU_HUKUM,
    label: 'Prodi Ilmu Hukum',
    kode_fakultas: ENUM_KODE_FAKULTAS.FEBH,
  },
  {
    key: ENUM_PROGRAM_STUDI.PENDIDIKAN_BIOLOGI,
    label: 'Prodi Pendidikan Biologi',
    kode_fakultas: ENUM_KODE_FAKULTAS.FKIP,
  },
  {
    key: ENUM_PROGRAM_STUDI.PENDIDIKAN_MATEMATIKA,
    label: 'Prodi Pendidikan Matematika',
    kode_fakultas: ENUM_KODE_FAKULTAS.FKIP,
  }
]

export const LIST_SEMESTER_GANJIL:number[] = [1,3,5,7];
export const LIST_SEMESTER_GENAP:number[] = [2,4,6,8];
export const IS_SEMESTER_GANJIL:boolean = true;

export const APP_ROUTE:IRouteApp[] = [
  {
    key: '/',
    label: 'utama'
  },
  {
    key: '/kelas',
    label: 'Kelas'
  },
];