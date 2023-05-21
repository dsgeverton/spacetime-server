import "dotenv/config";
import fastify from "fastify";
import { memoriesRoutes } from "./routes/memories";
import cors from "@fastify/cors";
import { authRoutes } from "./routes/auth";
import fastifyJwt from "@fastify/jwt";
import multipart from "@fastify/multipart";
import { uploadRoutes } from "./routes/upload";

const port = process.env.PORT ? parseInt(process.env.PORT) : 3030;
const host = process.env.HOST || "http://localhost";
const jwtSecret = process.env.SECRET || "spacetime";
const app = fastify();
app.register(cors, {
  origin: true,
});

app.register(fastifyJwt, {
  secret: jwtSecret,
});
app.register(multipart);
app.register(uploadRoutes);
app.register(authRoutes);
app.register(memoriesRoutes);

app.listen({ port }).then(() => {
  console.log(`🚀 Running on ${host}:${port}`);
});
