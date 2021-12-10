import { testSession } from "@/modules/test/session";
import { nextSupertest } from "@/modules/test/supertest";
import { MongoClient, ObjectId } from "mongodb";
import { handler } from "./poops";
import { PoopType } from "./types";

let mongoClient: MongoClient;

beforeEach(async () => {
  mongoClient = await new MongoClient(global.__MONGO_URI__).connect();
  mongoClient.db().dropDatabase();
});

describe("[GET] /api/poops", () => {
  test("should return list of poops", async () => {
    const collection = mongoClient.db().collection("poops");
    await collection.insertMany([
      {
        userId: testSession.userId,
        type: PoopType.Liquid,
        date: new Date("2022-01-26T15:00:00.000Z")
      },
      {
        userId: testSession.userId,
        type: PoopType.Normal,
        date: new Date("2022-01-26T16:00:00.000Z")
      },
      {
        userId: testSession.userId,
        type: PoopType.Nothing,
        date: new Date("2022-01-26T17:00:00.000Z")
      },
      {
        userId: testSession.userId,
        type: PoopType.Normal,
        date: new Date("2022-01-26T18:00:00.000Z")
      }
    ]);

    await nextSupertest(handler(testSession, mongoClient))
      .get("/api/poops")
      .set("User-Agent", "supertest")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect({
        poops: [
          { type: "normal", date: "2022-01-26T18:00:00.000Z" },
          { type: "nothing", date: "2022-01-26T17:00:00.000Z" },
          { type: "normal", date: "2022-01-26T16:00:00.000Z" },
          { type: "liquid", date: "2022-01-26T15:00:00.000Z" }
        ]
      });
  });
});

describe("[POST] /api/poops", () => {
  test("should record poop", async () => {
    const request = {
      type: PoopType.Normal,
      date: new Date("2022-01-26T18:00:00.000Z")
    };

    await nextSupertest(handler(testSession, mongoClient))
      .post("/api/poops")
      .set("User-Agent", "supertest")
      .send(request)
      .expect(201)
      .expect("Content-Type", /json/)
      .expect({
        ...request,
        date: request.date.toISOString()
      });

    const poops = await mongoClient.db().collection("poops").find().toArray();

    expect(poops).toEqual([
      {
        _id: expect.any(ObjectId),
        userId: testSession.userId,
        type: request.type,
        date: request.date
      }
    ]);
  });
});
