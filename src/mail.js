import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export async function sendConfirmationEmail(userEmail, token){
  const confirmationLink = `http://127.0.0.1:3000/api/confirm/${token}`;

  const mailOptions = {
    from: '"Weather App" <твій_імейл@gmail.com>',
    to: userEmail,
    subject: 'Confirm your subscription ',
    text: `Welcome! Please confirm your subscription by clicking this link: ${confirmationLink}`,
    html: `
      <h1>Welcome to Weather App!</h1>
      <p>Please click the button below to confirm your subscription:</p>
      <a href="${confirmationLink}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
        Confirm Subscription
      </a>
    `
  };

  return transporter.sendMail(mailOptions);
}

export async function sendWeatherEmail(userEmail, weatherData, city){
  const { temperature, humidity, description} = weatherData;
  const mailOptions = {
    from: '"Weather App" <твій_імейл@gmail.com>',
    to: userEmail,
    subject: `Щоденний прогноз погоди для міста ${city}`,
  
    html: `
      <h2>Привіт! Ось твій прогноз для міста ${city}:</h2>
      <p>Температура: <b>${temperature}°C</b></p>
      <p>Вологість: <b>${humidity}%</b></p>
      <p>Статус: <i>${description}</i></p>
      <br>
      <p><small>Щоб відписатися, перейди за посиланням</small></p>
    `
  }

  return transporter.sendMail(mailOptions);
}