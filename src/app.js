import Fastify from "fastify";
import firstRoute from "./routes/first_route.js";
import subscription from "./routes/subscription.js";
import { startCronJobs } from "../src/cron.js";
import { configDotenv } from "dotenv";

const fastify = Fastify({
  logger: true,
});

fastify.register(firstRoute);
fastify.register(subscription);

const start = async () => {
  try {
    fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
startCronJobs();
