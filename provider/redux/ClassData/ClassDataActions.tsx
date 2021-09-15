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

const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID ?? '';
const CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL ?? '';
const PRIVATE_KEY = process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY ?? '';
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
          nama_matakuliah: classData.nama_matakuliah,
          kelas: classData.kelas,
          semester: classData.semester,
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
        });
      });
      resolve(tempAllClass);
    } catch (err) {
      reject(err);
    }
  });
