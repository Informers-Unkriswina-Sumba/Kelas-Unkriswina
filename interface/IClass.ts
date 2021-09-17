export interface IClass {
  id: string;
  fakultas: string;
  kode_fakultas: string;
  program_studi: string;
  kode_program_studi: string;
  nama_matakuliah: string;
  kelas: string;
  semester: number;
  hari: string;
  jam_mulai: string;
  jam_berakhir: string;
  dosen_pengampu: string;
  kode: string;
  ruangan: string;
  deskripsi: string;
  whatsapp_link: string | null;
  classroom_link: string | null;
  classroom_code: string | null;
  zoom_meeting_link: string | null;
  zoom_meeting_code: string | null;
  google_meet_link: string | null;
  img_url: string;
}