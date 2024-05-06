const nodemailer = require("nodemailer");

const sendMail = (userEmail, token, id) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "agrimaagarwal722@gmail.com",
      pass: "oanprjaozgyiormm",
    },
  });

  const mailOptions = {
    from: "agrimaagarwal722@gmail.com",
    to: "agrimaagarwal722@gmail.com",
    subject: "password Reset",
    html: `
      <p> you are requested for password reset</p>
      <h5>click in this <a href ="https://localhost:3000/reset/${token}/${id}">link</a> to reset your password</h5>  `,
  };

  transporter.sendMail(mailOptions, (error, res) => {
    if (error) {
      res.status(400).json({
        success: "failure",
        error: error.message,
      });
    } else {
      res.status(200).json({
        success: "success",
        message: "Email sent successfully",
      });
    }
  });
};

module.exports = {
  sendMail,
};
