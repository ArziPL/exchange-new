import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

async function loginUser(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  let reqBody = JSON.parse(req.body);

  // Find user based on email, then find all prints fo user if user was found
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: reqBody.email,
      },
    });
    const prints = await prisma.prints.findMany({
      where: {
        id: user?.id,
      },
    });

    // Object of user to return to client if found
    const userToReturn = {
      id: user?.id,
      nick: user?.nick,
      email: user?.email,
      createdAt: user?.createdAt,
      menuChoose: user?.menuChoose,
    };

    // Making suer password acquired from database is string
    let passwordFromDB = "";
    if (typeof user?.password == "string") {
      passwordFromDB = user?.password;
    }

    // Checking if user password from client and user password from db are the same with bcrypt, if yes responding with user and his prints
    if (bcrypt.compareSync(reqBody.password, passwordFromDB)) {
      return res.status(200).json({ status: 200, message: "Logged in successfully", user: userToReturn, prints: prints });
    } else {
      return res.status(400).json({ status: 400, message: "Bad email or password, try again!" });
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ status: 400, message: "Something gone wrong" });
    }
    return res.status(500).json({ status: 500, message: "Something gone very wrong" });
  }
  // return res.status(200).json("data")
}

export default loginUser;
