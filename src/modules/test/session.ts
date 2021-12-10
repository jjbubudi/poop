import { SessionWithUserId } from "../auth/withApiAuth";

export const testSession: SessionWithUserId = {
  userId: "test",
  user: {
    name: "Test user",
    email: "test@example.com",
    image: "https://example.com/foo.png"
  },
  expires: ""
};
