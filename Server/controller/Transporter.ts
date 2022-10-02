import nodemailer from "nodemailer";

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "balajikrishna44589@gmail.com",
    pass: "gjvkdihwboxlykyz",
  },
});
export default transporter;
