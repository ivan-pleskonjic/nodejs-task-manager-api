const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'ivanpleskonjic5@gmail.com',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}. Let me how you get along with the app.`
  })
}

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'ivanpleskonjic5@gmail.com',
    subject: 'Goodbye!',
    text: `Goodbye ${name}. Is there anything we could do to stop you from leaving the app?`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
}