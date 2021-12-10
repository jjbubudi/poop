import { server } from "@/modules/test/server";
import { toast } from "@chakra-ui/react";
import "@testing-library/jest-dom/extend-expect";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";
import { setLogger } from "next-auth/lib/logger";

setLogger({
  debug: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
});

beforeAll(() =>
  server.listen({
    onUnhandledRequest: ({ headers, method, url }) => {
      if (headers.get("User-Agent") !== "supertest") {
        const message = `Unhandled ${method} request to ${url}`;
        console.error(message);
        throw new Error(message);
      }
    }
  })
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

beforeEach(async () => {
  toast.closeAll();
  const toasts = screen.queryAllByRole("listitem");
  await Promise.all(toasts.map((toasts) => waitForElementToBeRemoved(toasts)));
});
