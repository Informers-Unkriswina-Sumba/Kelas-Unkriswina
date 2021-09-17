import { ENUM_FAKULTAS, ENUM_PROGRAM_STUDI, ENUM_KODE_FAKULTAS, ENUM_KODE_PROGRAM_STUDI } from "../enum";

export interface IFilterFakultasType {
  key: ENUM_FAKULTAS;
  label: string;
  kode: ENUM_KODE_FAKULTAS
};

export interface IFilterProgramStudiType {
  key: ENUM_PROGRAM_STUDI;
  label: string;
  kode_program_studi: ENUM_KODE_PROGRAM_STUDI;
  kode_fakultas: ENUM_KODE_FAKULTAS;
}

export interface IRouteApp {
  key: string;
  label: string;
}

export interface IListMataKuliah {
  key: string;
  label: string; 
}