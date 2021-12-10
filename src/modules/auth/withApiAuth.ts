import { NextApiHandler } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export interface SessionWithUserId extends Session {
  readonly userId: string;
}

export const withApiAuth = (
  sessionHandler: (
    session: SessionWithUserId
  ) => NextApiHandler | Promise<NextApiHandler>
): NextApiHandler => {
  return async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).json({
        message: "You are not authenticated."
      });
      return;
    }
    const handler = await sessionHandler({
      ...session,
      userId: session.userId as string
    });
    return await handler(req, res);
  };
};
