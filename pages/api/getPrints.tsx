import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

async function changeChoice(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const reqBody = JSON.parse(req.body);

  // Find all prints with given user id
  try {
    const prints = await prisma.prints.findMany({
      where: {
        authorId: reqBody.id,
      },
    });
    return res.status(200).json({ message: "Prints obtained successfully", prints: prints });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ message: "Something gone wrong, check the data", prints: [] });
    }
    return res.status(500).json({ message: "Something gone very wrong", prints: [] });
  }
}

export default changeChoice;
