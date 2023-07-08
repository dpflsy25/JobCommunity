const nodemailer = require("nodemailer"); //npm 으로 설치한 nodemailer 모듈을 가져온다.
const { compileString } = require("sass");
const config = require(__dirname + "/../config/config.json");

const sendEmail = async (data) => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: config.mail.user,
      pass: config.mail.pass,
    },
  });
  transport.sendMail(data, (err, info) => {
    if(err) {
      console.log(err);
    } else {
      return info.response;
    }
  });
};

module.exports = sendEmail;
