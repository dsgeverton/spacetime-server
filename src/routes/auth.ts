import { FastifyInstance } from "fastify";
import { z } from "zod";
import axios from "axios";
import getGithubUser from "../utils/getGithubUser";
import { saveUser } from "../useCases/user";

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", async (req, res) => {
    const bodySchema = z.object({
      code: z.string(),
    });

    const { code } = bodySchema.parse(req.body);

    const accessTokenResponse = await axios.post(
      "http://github.com/login/oauth/access_token",
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    const { access_token } = accessTokenResponse.data;

    const githubUserResponse = await getGithubUser(access_token);

    const token = await saveUser(githubUserResponse.user, app);

    return { token };
  });
}
