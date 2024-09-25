import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/manifest", (req, res) => {
  const isNull = (data) => {
    return data ? `'${data}'` : data;
  };

  const {
    header: {
      id_data,
      nomor_aju,
      npwp,
      jns_manifest,
      kd_jns_manifest,
      kppbc,
      no_bc_10,
      tgl_bc_10,
      no_bc_11,
      tgl_bc_11,
      nama_sarana_angkut,
      kode_moda,
      call_sign,
      no_imo,
      no_mms,
      negara,
      arrival,
      departure_flight,
      nahkoda,
      handling_agent,
      pelabuhan_awal,
      pelabuhan_transit,
      pelabuhan_bongkar,
      pelabuhan_selanjutnya,
      kade,
      tgl_tiba,
      jam_tiba,
      tgl_kedatangan,
      jam_kedatangan,
      tgl_bongkar,
      jam_bongkar,
      tgl_muat,
      jam_muat,
      tgl_keberangkatan,
      jam_keberangkatan,
      total_pos,
      total_kemasan,
      total_kontainer,
      total_master_bl,
      total_bruto,
      total_volume,
      flag_nihil,
      status,
      no_perbaikan,
      tgl_perbaikan,
      seri_perbaikan,
      pemberitahu,
      lengkap,
      user,
      id_asal_data,
      id_modul,
      waktu_rekam,
      waktu_update,
      versi_modul,
    },
    master: {
      id_master,
      id_header,
      kd_kelompok_pos,
      no_master_bl_awb,
      tgl_master_bl_awb,
      jumlah_host_bl_awb,
      status_detail,
      respon,
    },
  } = req.body;

  const data_npwp = isNull(npwp);
  const data_jns_manifest = isNull(jns_manifest);
  const data_kd_jns_manifest = isNull(kd_jns_manifest);
  const data_kppbc = isNull(kppbc);
  const data_no_bc_10 = isNull(no_bc_10);
  const data_tgl_bc_10 = isNull(tgl_bc_10);
  const data_no_bc_11 = isNull(no_bc_11);
  const data_tgl_bc_11 = isNull(tgl_bc_11);
  const data_nama_sarana_angkut = isNull(nama_sarana_angkut);
  const data_kode_moda = isNull(kode_moda);
  const data_call_sign = isNull(call_sign);
  const data_no_imo = isNull(no_imo);
  const data_no_mms = isNull(no_mms);
  const data_negara = isNull(negara);
  const data_arrival = isNull(arrival);
  const data_departure_flight = isNull(departure_flight);
  const data_nahkoda = isNull(nahkoda);
  const data_handling_agent = isNull(handling_agent);
  const data_pelabuhan_awal = isNull(pelabuhan_awal);
  const data_pelabuhan_transit = isNull(pelabuhan_transit);
  const data_pelabuhan_bongkar = isNull(pelabuhan_bongkar);
  const data_pelabuhan_selanjutnya = isNull(pelabuhan_selanjutnya);
  const data_kade = isNull(kade);
  const data_tgl_tiba = isNull(tgl_tiba);
  const data_jam_tiba = isNull(jam_tiba);
  const data_tgl_kedatangan = isNull(tgl_kedatangan);
  const data_jam_kedatangan = isNull(jam_kedatangan);
  const data_tgl_bongkar = isNull(tgl_bongkar);
  const data_jam_bongkar = isNull(jam_bongkar);
  const data_tgl_muat = isNull(tgl_muat);
  const data_jam_muat = isNull(jam_muat);
  const data_tgl_keberangkatan = isNull(tgl_keberangkatan);
  const data_jam_keberangkatan = isNull(jam_keberangkatan);
  const data_total_pos = isNull(total_pos);
  const data_total_kemasan = isNull(total_kemasan);
  const data_total_kontainer = isNull(total_kontainer);
  const data_total_master_bl = isNull(total_master_bl);
  const data_total_bruto = isNull(total_bruto);
  const data_total_volume = isNull(total_volume);
  const data_flag_nihil = isNull(flag_nihil);
  const data_status = isNull(status);
  const data_no_perbaikan = isNull(no_perbaikan);
  const data_tgl_perbaikan = isNull(tgl_perbaikan);
  const data_seri_perbaikan = isNull(seri_perbaikan);
  const data_pemberitahu = isNull(pemberitahu);
  const data_lengkap = isNull(lengkap);
  const data_user = isNull(user);
  const data_id_asal_data = isNull(id_asal_data);
  const data_id_modul = isNull(id_modul);
  const data_waktu_rekam = isNull(waktu_rekam);
  const data_waktu_update = isNull(waktu_update);
  const data_versi_modul = isNull(versi_modul);

  const insertStrHeader = `insert into header values( ${id_data} , '${nomor_aju}' , ${data_npwp} , ${data_jns_manifest} ,${data_kd_jns_manifest},${data_kppbc}  , ${data_no_bc_10} , ${data_tgl_bc_10} ,${data_no_bc_11} , ${data_tgl_bc_11} ,${data_nama_sarana_angkut} ,${data_kode_moda}  , ${data_call_sign} , ${data_no_imo}  , ${data_no_mms} , ${data_negara}  ,${data_arrival} ,${data_departure_flight} ,${data_nahkoda} ,${data_handling_agent} ,${data_pelabuhan_awal} ,${data_pelabuhan_transit} ,${data_pelabuhan_bongkar},${data_pelabuhan_selanjutnya} ,${data_kade} ,${data_tgl_tiba} ,${data_jam_tiba} ,${data_tgl_kedatangan} ,${data_jam_kedatangan} ,${data_tgl_bongkar} ,${data_jam_bongkar} ,${data_tgl_muat} ,${data_jam_muat} , ${data_tgl_keberangkatan} ,${data_jam_keberangkatan}  , ${data_total_pos} , ${data_total_kemasan} , ${data_total_kontainer} , ${data_total_master_bl} , ${data_total_bruto} ,${data_total_volume} , ${data_flag_nihil}, ${data_status} ,${data_no_perbaikan} ,${data_tgl_perbaikan},  ${data_seri_perbaikan} , ${data_pemberitahu},${data_lengkap}, ${data_user},${data_id_asal_data} ,${data_id_modul}, ${data_waktu_rekam}, ${data_waktu_update} ,${data_versi_modul})`;

  // Master

  const data_kd_kelompok_pos = isNull(kd_kelompok_pos);
  const data_no_master_bl_awb = isNull(no_master_bl_awb);
  const data_tgl_master_bl_awb = isNull(tgl_master_bl_awb);
  const data_jumlah_host_bl_awb = isNull(jumlah_host_bl_awb);
  const data_status_detail = isNull(status_detail);
  const data_respon = isNull(respon);

  const insertStrMaster = `insert into master values(${id_master},${id_header},${nomor_aju},${data_kd_kelompok_pos},${data_no_master_bl_awb},${data_tgl_master_bl_awb},${data_jumlah_host_bl_awb},${data_status_detail},${data_respon})`;

  // Detail

  // Barang

  res.status(200).json({
    message: {
      header: insertStrHeader,
      master: insertStrMaster,
    },
  });
});

export default app;
