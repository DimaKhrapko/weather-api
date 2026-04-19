import db from '../src/db.js';
import { fetchWeather } from './routes/first_route.js';
import { sendWeatherEmail } from './mail.js';
import cron from 'node-cron';

export function startCronJobs() {
  cron.schedule('* * * * *', async () => {
    console.log("Початок розсилки");
    const activeEmail = await db.select('email', 'city').from("subscribers").where({is_active: true});
    for(const { email, city } of activeEmail) {
      const weatherData = await fetchWeather(city);
      await sendWeatherEmail(email, weatherData, city);
    }
  })
}

