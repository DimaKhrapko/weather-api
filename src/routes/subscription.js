import crypto from "crypto";
import db from "../db.js";
import { sendConfirmationEmail } from "../mail.js";

async function subscription(fastify, options) {
  fastify.post("/api/subscribe", async (request, reply) => {
    const { city, email, frequency } = request.body || {};
    if (!city || !email) return reply.status(400).send({ message: "Email and city are required" });
    if(frequency !== "daily" && frequency !== "hourly") return reply.status(400).send({message: "Frequency should be daily or hourly"});
    
    const token = crypto.randomBytes(16).toString("hex");
    try {
      await db("subscribers").insert({
        email: email,
        city: city,
        token: token,
        frequency: frequency,
      });

      await sendConfirmationEmail(email, token);
    } catch (err) {
      if (err.code === "23505") {
        return reply
          .status(409)
          .send({ message: "This email is already subscribed" });
      } else {
        return reply.status(500).send({ message: "Internal server error" });
      }
    }

    return reply.status(200).send({ message: "Дані успішно отримано!" });
  });

  fastify.get("/api/confirm/:token", async (request, reply) => {
    const { token } = request.params;
    const updatedRows = await db("subscribers")
      .where({ token: token })
      .update({ is_active: true });

    if (!updatedRows) {
      return reply.status(404).send({
        message: "Wrong or outdated token",
      });
    }

    return reply.status(200).send({
      message: "email was verified",
    });
  });

  fastify.get("/api/unsubscribe/:token", async (request, reply) => {
    const { token } = request.params;
    const deleteRow = await db('subscribers').where({token: token}).del(); 

    if(!deleteRow) return reply.status(404).send({
      message: "Wrong or outdated token"
    })

    return reply.status(200).send({
      message: "Email was unsubscribed"
    })
  })
}

export default subscription;
