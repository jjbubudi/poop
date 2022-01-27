import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { render, screen, waitForElementToBeRemoved } from "../test/react";
import { server } from "../test/server";
import { PoopRequest, PoopType } from "./api/types";
import { Poop } from "./Poop";

describe("Poop", () => {
  beforeEach(() => {
    render(<Poop />);
  });

  test("should render heading", () => {
    expect(
      screen.getByRole("heading", { name: "I pooped" })
    ).toBeInTheDocument();
  });

  test(`should select ${PoopType.Normal} as the default type of poop`, () => {
    expect(screen.getByRole("radio", { name: /Normal/ })).toBeChecked();
  });

  test.each([
    { type: PoopType.Normal, name: /Normal/ },
    { type: PoopType.Little, name: /Little/ },
    { type: PoopType.Liquid, name: /Liquid/ },
    { type: PoopType.Nothing, name: /Nothing/ }
  ])(`should record "$type" poop`, async ({ type, name }) => {
    server.use(
      rest.post<PoopRequest>("/api/poops", (req, res, ctx) => {
        if (req.body.type !== type) {
          return res(ctx.status(400));
        }
        return res(
          ctx.status(201),
          ctx.json({
            type: type,
            date: new Date(2021, 12, 25, 11, 0, 0)
          })
        );
      })
    );

    userEvent.click(screen.getByRole("radio", { name: name }));
    userEvent.click(screen.getByRole("button", { name: /Done/ }));

    await waitForElementToBeRemoved(() =>
      screen.getByRole("button", { name: /Submitting/ })
    );

    expect(screen.getByLabelText(/Poop recorded/)).toBeInTheDocument();
  });
});
