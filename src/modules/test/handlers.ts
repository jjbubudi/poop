import { RequestHandler, rest } from "msw";
import { testSession } from "./session";

export const handlers: RequestHandler[] = [
  rest.get("http://localhost/api/auth/session", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(testSession));
  }),
  rest.post("http://localhost/api/auth/_log", (_, res, ctx) => {
    return res(ctx.status(200));
  })
];
