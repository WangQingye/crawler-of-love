const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport');
// let transporter = nodemailer.createTransport(smtpTransport({
//   service: 'QQ',
//   auth: {
//     user: "329103586@qq.com",
//     pass: "ukbqucqmznuzbjhj"
//   }
// }));
// console.log(transporter);

const email = {
  service: 'QQ',
  user: 'xy1ovexy@sina.com',
  pass: '38524e0a90c6afa3',
}
const smtpTransporter = nodemailer.createTransport({
    host: "smtp.sina.com", // qq邮箱主机
    secure: true,
    port: 465, // SMTP 端口
    auth: {
        user: email.user,
        pass: email.pass
    },
    tls: {rejectUnauthorized: false}
});
smtpTransporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});
// /**
//  * @param {String} recipient 收件人
//  * @param {String} subject 发送的主题
//  * @param {String} html 发送的html内容
//  */
// var sendMail = function (recipient, subject, html) {

//   smtpTransporter.sendMail({

//         from: email.user,
//         to: recipient,
//         subject: subject,
//         html: html

//     }, function (error, response) {
//         if (error) {
//             console.log(error);
//         } else {
//           console.log('发送成功')
//         }
//     });
// }
// sendMail('329103586@qq.com','这是测试邮件', 'Hi Amor,这是一封测试邮件');
// // module.exports = sendMail;