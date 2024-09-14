import React from "react";
import { Box, Flex, Table } from "@radix-ui/themes";
import { Link, ErrorMessage, IssueStatusBadge } from "@/app/components";
import prisma from "@/prisma/client";
import delay from "delay";
import IssuesHeader from "./IssuesHeader";
import { Status } from "@prisma/client";

interface Props {
  searchParams: {
    status: Status;
  };
}
const IssuesPage = async ({ searchParams }: Props) => {
  //get our list of status'
  const statuses = Object.values(Status);

  //Set our status if the searchParams are valid. Otherwise set to undefined so prisma will not include it as filter
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: status,
    },
  });
  return (
    <>
      <IssuesHeader />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
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
