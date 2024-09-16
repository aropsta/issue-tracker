import React from "react";
import { Flex } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssuesHeader from "./IssuesHeader";
import { Status } from "@prisma/client";
import Pagination from "@/app/components/Pagination";
import IssuesTable, { IssueQuery } from "./IssuesTable";
import { columnNames } from "./IssuesTable";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}
const IssuesPage = async ({ searchParams }: Props) => {
  //get a list of statuses from our prisma Status enum
  const statuses = Object.values(Status);

  //Creating prisma filter object for status'
  //firstly checking validity of search params using our list of status'. undefined value won't be filtered by prisma
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  //Object prisma uses to filter results. In this case finds entries who's status' are set to our status above
  const where = {
    status,
  };

  // Creating filter object for sort order
  //Checking validity of orderBy serachParam and set it to a query object for prisma prisma
  //1. Map each column value into another array
  //2. check if our searchParam is within that array
  //3. Returned object used by prisma to sort, or underfined

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.direction }
    : undefined;

  //variables for pagination
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  //Total number of issues in db
  const count = await prisma.issue.count({
    where,
  });

  //Get all our issues according to all our filter object
  //Included here are skip and take which are for pagination
  //TODO: Implement sorting by decending
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    //number of records to skip. Here skipping 1 pages worth of items
    skip: (page - 1) * pageSize,
    //number of records get
    take: pageSize,
  });

  return (
    <Flex direction="column" gap="3">
      <IssuesHeader />
      <IssuesTable searchParams={searchParams} issues={issues} />
      <Pagination pageSize={pageSize} currentPage={page} itemCount={count} />
    </Flex>
  );
};
//telling nextjs to NOT make this a static page.
export const dynamic = "force-dynamic";

//Metadata for title and stuff
export const metadata: Metadata = {
  title: "Issue Track - List of issues",
  description: "View all issues",
};

export default IssuesPage;
