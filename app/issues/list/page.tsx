import React from "react";
import { Box, Flex, Table } from "@radix-ui/themes";
import { Link, ErrorMessage, IssueStatusBadge } from "@/app/components";
import NextLink from "next/link";
import prisma from "@/prisma/client";
import delay from "delay";
import IssuesHeader from "./IssuesHeader";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
  };
}
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

const IssuesPage = async ({ searchParams }: Props) => {
  //get a list of statuses from our prisma Status enum
  const statuses = Object.values(Status);

  //Check validity of search params using our list of status'. undefined value won't be filtered by prisma
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  //Checking validity of orderBy serachParam so it can be passed to prisma
  //1. Map each column value into another array
  //2. check if our searchParam is within that array
  //3. Return the object prisma will use to sort, or underfined
  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  //Get all our issues according to filter object with status field
  //TODO: Implement sorting by decending
  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
    orderBy: orderBy,
  });

  return (
    <>
      <IssuesHeader />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.title}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>

                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};
//telling nextjs to NOT make this a static page.
export const dynamic = "force-dynamic";
export default IssuesPage;
