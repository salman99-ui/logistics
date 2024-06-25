export const getTemplateEmail = (email) => ({
  from: "ahassnabila4@gmail.com", // sender address
  to: email, // list of receivers
  subject: "Email Pemesanan Servis",
  text: "That was easy!",
  html: `<b>Pemesanan Reservasi! </b>
         <br> Anda telah berhasil melakukan reservasi <br/>`,
});

export const getTemplateEmailPembayaran = (email) => ({
  from: "ahassnabila4@gmail.com", // sender address
  to: email, // list of receivers
  subject: "Email Pembayaran Servis",
  text: "That was easy!",
  html: `<b>Pembayaran Reservasi! </b>
         <br> Anda telah berhasil melakukan pembayaran reservasi,silahkan ambil kendaraan anda secepatnya ! <br/>`,
});
