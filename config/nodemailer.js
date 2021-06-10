// passwird 2FA gmail: slrvfxqgzepsncka
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'allysa.rahagustiani@gmail.com',
        pass: 'slrvfxqgzepsncka'
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = { transporter }