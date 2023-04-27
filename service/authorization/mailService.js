const nodemailer = require('nodemailer');

// module.exports.mailService = {
//   constructor() {
//     // `this` here refers us to mailService object
//     // transporter, using create transported, uses for sending messages.
//     this.transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST, // host of mail server
//       port: process.env.SMTP_PORT, // it's port
//       secure: false, // read about it after finishing
//       auth: {
//         //some auth info about account 'sender' of mail
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASSWORD,
//       },
//     });
//   },

//   sendActivationMail: async (to, link) => {
//     // well i dunno why, but since this moment it doesnt gives advice after `this.`
//     await this.transporter.sendMail({
//       from: process.env.SMTP_USER,
//       to, // adressee
//       subject: 'Активация аккаунта на ' + process.env.API_URL, // Subject of message
//       text: '', // well, we'll send html
//       html:
//       `
//         <div>
//           <h1>Перейдите по ссылке, чтобы активировать аккаунт</h1>
//           <a href=""
//         </div>
//       `
//     });
//   },
// };
// // we need service to not make controllers to fat. We separete code.

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true, // only for 465 port, seems like
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, link) {
    try {
      console.log('debug mailService 1', process.env.SMTP_USER);
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: 'Активация аккаунта на ' + process.env.API_URL,
        text: '',
        html: `
        <div>
          <h1>Для активации перейдите по ссылке</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
      });
      console.log('debug mailService 2');
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new MailService();
