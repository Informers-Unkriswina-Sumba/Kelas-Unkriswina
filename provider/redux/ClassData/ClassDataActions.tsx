import { Dispatch } from 'react';
import { IClass } from '../../../interface/IClass';
import { SET_DATA_CLASS } from './Constant';
import { IClassDataState } from './ClassDataReducer';
import { ClassDataTypes } from './ClassDataTypes';
import { GoogleSpreadsheet } from 'google-spreadsheet';

export const actionSetDataClass = () => {
  return async (
    dispatch: Dispatch<ClassDataTypes>,
    getState: () => IClassDataState
  ) => {
    const allClass: any = await handleGetClassData();
    dispatch({
      type: SET_DATA_CLASS,
      allClass: allClass,
    });
  };
};

const SPREADSHEET_ID = '1hUTVKnDgglK_iSICnSkx2LYGLdaoEoucH9G-cqX8gNc'; // process.env.NEXT_PUBLIC_SPREADSHEET_ID ?? '';
const CLIENT_EMAIL = 'admin-904@kelas-unkriswina.iam.gserviceaccount.com'; // process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL ?? '';
const PRIVATE_KEY =
  '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCCAt4++4mQswqY\nnnEVEa5yXyjXPgNH3slM3fV5cs4EihQoLJkUA4Lp4rJWcOoFCuNlx5lAEDPbjh+0\np+HabRP3ylevDnFKGb41xXJJMuBgJxGTPtrjTz5q7RwEfvIMOMUtltvbmxX08J98\ne6vgGO0mVIEPsCnTVLpr3QZMv70N8zkXJ1P26lWdN6Ob+8A1Fr4AhSOtKQBN/Krg\niB6USz/JY0clZDXGJYl044yTRzZcHGi1Yp3IMbLHPI5Rn/eF/I05u48YUiP8A88l\n7LKbkCo5n5zijeGTjUUxCk+RW4h2JobSp8YoGTfAszJsCZt3YwWHwbtxAWv4Wx3T\nIMWCZefBAgMBAAECggEAPLwJRcPtCj9RomVV72FArKY+pnqOPstZH4MK8y7KBj3Y\n18Gpyzsus4MXC6GY+T0SaNAbC93l09mrfxH0RL0zGE0atCkbjGHFRUpVLtPJFLH7\nmF1DFPBGeN4GeiUxfrsghcEVORxUYAXug1EkxD3wvzi3x/PkPhi1M8FfeYgS0cpU\nu1uR/Is7ZNwsb9pUXGzxQwUVc/zYMi5t5wThSFE6WShZOIjZjhZSVs4JH+OGobHd\nHIGGdrlj0I5UfB5o8qlcbLPLZZWeJgFg3TpfoFkekpEZKb4ruX35PZn1UWuNwMRi\nhYhzTmIJDVqhWyAYd050HeZF2yEvT63fSIWZV85oHwKBgQC3dN2KCaBzHV+UfwuM\n6G579Qi26ko8mYwi2VCwjRk3LAPjzNGVY2SXlN/RqvFw3S57S4LCiYkvoeWTAEJj\nkgQEwmyIA9YZsFF664NM6axLGmEq+zGbuEYGwlNYPzJgc8O02XjMf+t0NgKGqhtn\nfDGgOZorAaho7eKaNvqiyBpx7wKBgQC1a8ic+AcJfEO7LWNKRGF4RGKSCZQ9FHte\nFgCAwK40ZM7GvT5o/VBWXrnO840VnuaUOlpy3eWg0W2ZmBtoDZa3XeIEvV8U2OOg\ngN/Z9Zj5zYxFL7Dy3VNFNYXNv0h1B/mGuwjp6+XfviayFuYqp4vs1qDHUGm4Hcff\nMohHanIxTwKBgQCPcNbPWVuU5kCXcQZs9Ed+sEZSDrpgy4XgsZ3/jTNMCiQ4dyrf\n7Uj3pDWkUE5bevUe/hmNVdBn5+QCnk9KXx65QfNuHeHHUC9FNuQAvSwzxLp4ytMs\n+FX4bvSPqUoQVDOPMgLbkqFcyeYLuPGYZmi+6Ir8WV1+PZHSFm693EuhDQKBgFAy\nBwosMaAlyCLzm1J3C8cII7J+fYLKjQY4H5zKj7clYKpFeVMbtumXEffDfXgzN6YK\nbXUdVaZTLWmZ7XN/nkIMRB7oPyGOBoEqtsk4YZj7Hahvvn59C5QqZq1egv8IuWqv\nPu94kbLn8V8D9FainZ3h+kxg5Xq332RwiAFZsoTNAoGAYLRsRLyxrDAmsJRe4U5B\n6RPdcTXJ0Q54zUBcZegOzU6UTMvWSAteyW4+OoDGS+K/Uv28M3giukxN2rRDWH1L\nnFMwMWegPd/k8kLuljJfRLllMbpuBv3+LsE640e/5QWNxMVzhI0ZdBgNF78ZTtIa\nRz59za8F0eIynjoUMOJk8dU=\n-----END PRIVATE KEY-----\n'; //process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY ?? '';
const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

const handleGetClassData = () =>
  new Promise(async (resolve, reject) => {
    try {
      const tempAllClass: IClass[] = [];
      await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      });
      // loads document properties and worksheets
      await doc.loadInfo();

      const sheet = doc.sheetsByIndex[1]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
      // read rows
      const rows = await sheet.getRows(); // can pass in { limit, offset }
      rows.forEach((classData: any) => {
        tempAllClass.push({
          id: classData.id,
          fakultas: classData.fakultas,
          kode_fakultas: classData.kode_fakultas,
          program_studi: classData.program_studi,
          kode_program_studi: classData.kode_program_studi,
          nama_matakuliah: classData.nama_matakuliah,
          kelas: classData.kelas,
          semester: Number(classData.semester),
          hari: classData.hari,
          jam_mulai: classData.jam_mulai,
          jam_berakhir: classData.jam_berakhir,
          dosen_pengampu: classData.dosen_pengampu,
          kode: classData.kode,
          ruangan: classData.ruangan,
          deskripsi: classData.deskripsi,
          whatsapp_link: classData?.whatsapp_link ?? null,
          classroom_link: classData?.whatsapp_link ?? null,
          classroom_code: classData?.classroom_code ?? null,
          zoom_meeting_link: classData?.zoom_meeting_link ?? null,
          zoom_meeting_code: classData?.zoom_meeting_code ?? null,
          google_meet_link: classData?.google_meet_link ?? null,
          img_url: '/images/logo-unkriswina-sumba-512.jpg',
        });
      });
      resolve(tempAllClass);
    } catch (err) {
      reject(err);
    }
  });
