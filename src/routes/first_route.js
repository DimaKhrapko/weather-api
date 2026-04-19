export async function fetchWeather(city) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_TOKEN}&q=${city}&aqi=no`,
  );
  if (!response.ok) {
    throw new Error("City not found")
  }
  const data = await response.json();
  const { temp_c, humidity } = data.current;
  const smth = data.current.condition.text;

  return { 
    temperature: temp_c,
    humidity: humidity, 
    description: smth
  };
}

async function routes(fastify, options) {
  fastify.get("/api/weather", async (request, reply) => {
    const city = request.query.city;

    if (!city) return reply.status(400).send({ error: "City undefined" });
    try{
      const response = await fetchWeather(city);
      return response;
    } catch(err){
      return reply.status(404).send({comment: "City not found"});
    }
  });
}

export default routes;
