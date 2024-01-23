const nodemailer = require('nodemailer');
const i18n = require('i18n')
i18n.configure({
    locales: ['En', 'Mn'],
    directory: __dirname + '/locales',
    defaultLocale: 'En',
})

module.exports = {
    deliverEmail: function (dest, subject, body) {
        var transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
              type: "OAuth2",
              user: process.env.USER_EMAIL,
              accessToken: process.env.ACCESS_TOKEN,
              clientId: process.env.CLIENT_ID,
              clientSecret: process.env.CLIENT_SECRET,
              refreshToken: process.env.REFRESH_TOKEN,
            },
          });
    
        var mailOptions = {
            from: process.env.EMAIL,
            to: dest,
            subject: subject,
            text: body
        };
    
        transport.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }   
}