import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Skeleton,
  Table,
  TableProps,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { Column, useSortBy, useTable } from "react-table";

export interface DataTableProps<T extends object> extends TableProps {
  readonly data: T[];
  readonly columns: Column<T>[];
  readonly isLoading?: boolean;
}

/* eslint-disable react/jsx-key */
export function DataTable<T extends object>({
  data,
  columns,
  isLoading,
  ...rest
}: DataTableProps<T>) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <Table {...getTableProps()} {...rest}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                width={column.width}
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render("Header")}
                <Text as="span" pl="4">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TriangleDownIcon aria-label="sorted descending" />
                    ) : (
                      <TriangleUpIcon aria-label="sorted ascending" />
                    )
                  ) : null}
                </Text>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {isLoading
          ? new Array(5).fill(0).map((_, index) => (
              <Tr key={index}>
                {columns.map((_, index) => (
                  <Td key={index}>
                    <Skeleton height="20px" width="xs" />
                  </Td>
                ))}
              </Tr>
            ))
          : rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  ))}
                </Tr>
              );
            })}
      </Tbody>
    </Table>
  );
}
