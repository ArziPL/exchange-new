import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const reqBody = JSON.parse(req.body);

  // Delete all prints of user and user in prisma transaction
  try {
    const deletePrints = prisma.prints.deleteMany({
      where: {
        authorId: reqBody.id,
      },
    });
    const deleteUser = prisma.user.delete({
      where: {
        id: reqBody.id,
      },
    });
    const transaction = await prisma.$transaction([deletePrints, deleteUser]);
    return res.status(200).json("The account will be deleted in a moment ...");
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json("Something gone wrong");
    }
    return res.status(500).json("Something gone very wrong");
  }
}

export default deleteUser;
