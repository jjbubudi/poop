import { SessionWithUserId } from "@/modules/auth/withApiAuth";
import { MongoClient } from "mongodb";
import { NextApiHandler } from "next";
import { PoopRequest, PoopResponse, PoopsResponse } from "./types";

export const handler = (
  { userId }: SessionWithUserId,
  mongoClient: MongoClient
): NextApiHandler<PoopResponse | PoopsResponse> => {
  return async (req, res) => {
    const collection = mongoClient.db().collection("poops");

    switch (req.method) {
      case "POST":
        const { type, date = new Date() } = req.body as PoopRequest;
        await collection.insertOne({ userId, type, date: new Date(date) });
        return res.status(201).json({ type, date });

      case "GET":
        const documents = await collection
          .find({ userId })
          .sort({ date: -1 })
          .toArray();
        return res.status(200).json({
          poops: documents.map(({ type, date }) => ({ type, date }))
        });

      default:
        return res.status(405).end();
    }
  };
};
