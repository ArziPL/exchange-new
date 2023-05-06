import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

async function registerUser(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json("Method not allowed");
  }
  const reqBody = JSON.parse(req.body);

  // Hashing user password with bcrypt
  const hash = bcrypt.hashSync(reqBody.password, 1);


  // Creating new user in db, if email already exists responds with 400
  try {
    await prisma.user.create({
      data: {
        nick: reqBody.nick,
        email: reqBody.email,
        menuChoose: reqBody.menuChoose,
        password: hash,
      },
    });
    return res.status(200).json({ message: "Account created successfully" });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(400).json({ message: "An account with this email already exists!" });
      } else {
        return res.status(500).json({ message: "Something gone wrong, try again later!" });
      }
    }
    throw e;
  }
}

export default registerUser;
