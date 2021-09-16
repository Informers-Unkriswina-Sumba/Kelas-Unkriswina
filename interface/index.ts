import { ENUM_FAKULTAS, ENUM_PROGRAM_STUDI, ENUM_KODE_FAKULTAS } from "../enum";

export interface IFilterFakultasType {
  key: ENUM_FAKULTAS;
  label: string;
  kode: ENUM_KODE_FAKULTAS
};

export interface IFilterProgramStudiType {
  key: ENUM_PROGRAM_STUDI;
  label: string;
  kode_fakultas: ENUM_KODE_FAKULTAS;
}

export interface IRouteApp {
  key: string;
  label: string;
}
