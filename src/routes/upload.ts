import { FastifyInstance } from "fastify";

export async function uploadRoutes(app: FastifyInstance) {
  app.post("/upload", async (req, res) => {
    const upload = await req.file({
      limits: {
        fieldSize: 5_242_880, // 5mb
      },
    });
    if (!upload) {
      return res.status(400).send();
    }

    const mimiTypesRegex = /^(image|video)\/[a-zA-Z]+/;

    const isValidMimiType = mimiTypesRegex.test(upload.mimetype);

    if (!isValidMimiType) {
      return res.status(400).send();
    }

    console.log(upload.filename);
  });
}
