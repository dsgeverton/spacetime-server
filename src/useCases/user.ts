import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

type User = {
  id: number;
  name: string;
  login: string;
  avatar_url: string;
};

export async function saveUser(user: User, app: FastifyInstance): Promise<any> {
  let userInfo = await prisma.user.findUnique({
    where: {
      githubId: user.id,
    },
  });

  if (!userInfo) {
    userInfo = await prisma.user.create({
      data: {
        avatarUrl: user.avatar_url,
        githubId: user.id,
        login: user.login,
        name: user.name,
      },
    });
  }

  const token = app.jwt.sign(
    {
      name: userInfo.name,
      avatarUrl: userInfo.avatarUrl,
    },
    {
      sub: userInfo.id,
      expiresIn: "7 days",
    }
  );

  return token;
}
