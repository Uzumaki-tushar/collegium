const { response } = require('express');
const nodemailer=require('nodemailer');

module.exports.transporter = nodemailer.createTransport({
  service:"gmail",
  secure:true,
  port: 465,
  auth:{
    user:"tushar2471.be22@chitkara.edu.in",
    pass:"qgmn udtf kcvo inpi"
  }
});



