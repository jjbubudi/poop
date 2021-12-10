import { formatISO9075 } from "date-fns";
import React from "react";
import { Column } from "react-table";
import useSWR from "swr";
import { fetcher } from "../common/api/fetcher";
import { DataTable } from "../common/components/DataTable";
import { PoopResponse, PoopsResponse } from "./api/types";
import { TypeToName } from "./utils";

const columns: Column<PoopResponse>[] = [
  {
    Header: "Date",
    accessor: "date",
    Cell: ({ value }) => formatISO9075(new Date(value)),
    width: "50%"
  },
  {
    Header: "Poop",
    accessor: "type",
    Cell: ({ value }) => TypeToName[value],
    width: "50%"
  }
];

export const History: React.FC = () => {
  const { data, error } = useSWR<PoopsResponse>("/api/poops", fetcher);
  const isLoading = !error && !data;
  return (
    <DataTable
      aria-label={isLoading ? "Loading history" : "History"}
      columns={columns}
      data={data?.poops || []}
      isLoading={isLoading}
    />
  );
};
