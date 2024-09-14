"use client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Link, ErrorMessage, IssueStatusBadge } from "@/app/components";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import { Header } from "@radix-ui/themes/src/components/table.jsx";

//Our table columns that get mapped to a table header
const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  {
    label: "Issue",
    value: "title",
  },
  {
    label: "Status",
    value: "status",
    className: "hidden md:table-cell",
  },
  {
    label: "Created",
    value: "createdAt",
    className: "hidden md:table-cell",
  },
];

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
  };
  ascending: boolean;
}
const IssueTableHeaders = ({ searchParams, ascending }: Props) => {
  return (
    <>
      {columns.map((c) => (
        <Table.ColumnHeaderCell key={c.value}>
          <NextLink
            onClick={() => (ascending = !ascending)}
            href={{ query: { ...searchParams, orderBy: c.value } }}
          >
            {c.label}
            {c.value === searchParams.orderBy && (
              <ArrowUpIcon className="inline" />
            )}
          </NextLink>
        </Table.ColumnHeaderCell>
      ))}
    </>
  );
};
export default IssueTableHeaders;
