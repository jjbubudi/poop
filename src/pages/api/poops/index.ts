import { withApiAuth } from "@/modules/auth/withApiAuth";
import { mongoConnection } from "@/modules/common/mongodb/client";
import { handler } from "@/modules/poop/api/poops";

export default withApiAuth(async (session) =>
  handler(session, await mongoConnection)
);
