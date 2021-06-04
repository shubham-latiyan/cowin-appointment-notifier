const mailjet = require("node-mailjet").connect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

const sendEmail = (total_appointments, cowin_text_template) => {
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "shubham.latiyan@plus91.in",
          Name: "Cowin Appointments",
        },
        To: [
          {
            Email: "shubhamlatiyan46@gmail.com",
            Name: "Shubham Latiyan",
          },
        ],
        TemplateID: 2939101,
        TemplateLanguage: true,
        Subject: "🚀 Available Cowin Appointments",
        Variables: {
          total_appointments,
          cowin_text_template,
        },
      },
    ],
  });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
};

module.exports = { sendEmail };
