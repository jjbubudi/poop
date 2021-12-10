import { formatISO9075 } from "date-fns";
import { rest } from "msw";
import {
  render,
  screen,
  waitForElementToBeRemoved,
  within
} from "../test/react";
import { server } from "../test/server";
import { PoopType } from "./api/types";
import { History } from "./History";
import { TypeToName } from "./utils";

describe("History", () => {
  test("should display poop history", async () => {
    const poops = [
      {
        type: PoopType.Liquid,
        date: "2021-12-25T15:00:00.000Z"
      },
      {
        type: PoopType.Normal,
        date: "2021-12-25T14:00:00.000Z"
      },
      {
        type: PoopType.Nothing,
        date: "2021-12-25T13:00:00.000Z"
      }
    ];

    server.use(
      rest.get("/api/poops", (_, res, ctx) => {
        return res(ctx.status(200), ctx.json({ poops }));
      })
    );

    render(<History />);

    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i));

    const historyTable = screen.getByRole("table", { name: /history/i });
    expect(
      within(historyTable)
        .queryAllByRole("columnheader")
        .map((header) => header.textContent)
    ).toEqual(["Date", "Poop"]);

    const [, ...rows] = within(historyTable).queryAllByRole("row");
    expect(
      rows.map((row) =>
        within(row)
          .queryAllByRole("cell")
          .map((cell) => cell.textContent)
      )
    ).toEqual(
      poops.map((poop) => [
        formatISO9075(new Date(poop.date)),
        TypeToName[poop.type]
      ])
    );
  });
});
