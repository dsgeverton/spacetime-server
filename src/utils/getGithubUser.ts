import axios from "axios";
import z from "zod";

export default async function getGithubUser(accessToken: string) {
  const userResponse = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const userSchema = z.object({
    id: z.number(),
    login: z.string(),
    name: z.string(),
    avatar_url: z.string().url(),
  });

  const user = userSchema.parse(userResponse.data);

  return { user };
}
