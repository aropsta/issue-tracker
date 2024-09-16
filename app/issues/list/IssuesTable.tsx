import React, { ReactNode } from "react";
import { Link, ErrorMessage, IssueStatusBadge } from "@/app/components";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import NextLink from "next/link";
import { Table } from "@radix-ui/themes";
import { Issue, Status } from "@prisma/client";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
  direction: "asc" | "desc";
}
interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssuesTable = async ({ searchParams, issues }: Props) => {
  let direction: "asc" | "desc" = searchParams.direction;
  if (direction === "asc") direction = "desc";
  else direction = "asc";

  function arrowIcon(): ReactNode {
    if (direction == "asc") return <AiOutlineArrowUp className="inline" />;
    return <AiOutlineArrowDown className="inline" />;
  }

  return (
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
                  query: {
                    ...searchParams,
                    orderBy: column.value,
                    direction: direction,
                  },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === searchParams.orderBy && arrowIcon()}
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
  );
};
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
export const columnNames = columns.map((c) => c.value);
export default IssuesTable;
