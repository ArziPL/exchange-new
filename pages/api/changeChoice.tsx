import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

async function changeChoice(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const reqBody = JSON.parse(req.body);

  // Update user choice base on user id
  try {
    await prisma.user.update({
      where: {
        id: reqBody.id,
      },
      data: {
        menuChoose: reqBody.menuChoose,
      },
    });
    return res.status(200).json("Changed successfully");
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json("Something gone wrong, check the data");
    }
    return res.status(500).json("Something gone very wrong");
  }
}

export default changeChoice;
