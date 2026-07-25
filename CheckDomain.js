const cron = require("node-cron");
const nodemailer = require("nodemailer");
const dns = require("dns");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "waloood@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

function checkDomain(domain) {
  dns.resolve(domain, (err) => {
    if (err && err.code === "ENOTFOUND") {
      console.log(`الدومين ${domain} متاح!`);
      sendEmail(domain);
    } else {
      console.log(`الدومين ${domain} لا يزال مسجلاً.`);
    }
  });
}

function sendEmail(domain) {
  let mailOptions = {
    from: "waloood@gmail.com",
    to: "waloood@gmail.com",
    subject: "تنبيه: الدومين أصبح متاحاً!",
    text: `الدومين ${domain} الذي تراقبه أصبح متاحاً للتسجيل.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("تم إرسال البريد الإلكتروني: " + info.response);
    }
  });
}

// يتم تشغيل هذه المهمة يومياً في الساعة 9 صباحاً

console.log("بدء الفحص اليومي...");
checkDomain("tajsee.com");
checkDomain("tajseem.com");
