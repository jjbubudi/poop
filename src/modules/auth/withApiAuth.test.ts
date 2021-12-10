import { rest } from "msw";
import { server } from "../test/server";
import { testSession } from "../test/session";
import { nextSupertest } from "../test/supertest";
import { withApiAuth } from "./withApiAuth";

describe("withApiAuth", () => {
  test("return 401 if unauthenticated", async () => {
    server.use(
      rest.get("http://localhost/api/auth/session", (_, res, ctx) =>
        res(ctx.status(401))
      )
    );

    const handler = withApiAuth(() => (_, res) => res.status(200).end());

    await nextSupertest(handler)
      .get("/whatever")
      .set("User-Agent", "supertest")
      .expect("Content-Type", /json/)
      .expect(401);
  });

  test("pass session to API handler if authenticated", async () => {
    const handler = withApiAuth(
      (session) => (_, res) => res.status(200).json(session)
    );

    await nextSupertest(handler)
      .get("/whatever")
      .set("User-Agent", "supertest")
      .expect("Content-Type", /json/)
      .expect(200, testSession);
  });
});
