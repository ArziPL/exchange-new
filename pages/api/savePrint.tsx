// @ts-nocheck
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

async function savePrint(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  let reqBody = JSON.parse(req.body);

  // Saving new print connected to specific user based on id
  try {
    await prisma.prints.create({
      data: {
        name: reqBody.name,
        symbol: reqBody.symbol,
        price: reqBody.price,
        volume24h: reqBody.volume24h,
        circulatingSupply: reqBody.circulatingSupply,
        marketDominance: reqBody.marketDominance,
        author: {
          connect: {
            id: reqBody.authorId,
          },
        },
      },
    });
    return res.status(200).json("Print saved successfully!");
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json("Something gone wrong");
    }
    return res.status(500).json("Something gone very wrong");
  }
}
export default savePrint;
