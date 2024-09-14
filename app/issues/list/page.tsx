import React from "react";
import { Box, Flex, Table } from "@radix-ui/themes";
import { Link, ErrorMessage, IssueStatusBadge } from "@/app/components";
import NextLink from "next/link";
import prisma from "@/prisma/client";
import delay from "delay";
import IssuesHeader from "./IssuesHeader";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";
import { SearchParamProp } from "../utils";
import IssuesTable from "./IssuesTable";

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

const IssuesPage = async ({ searchParams }: SearchParamProp) => {
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

  // Creating filter objcet for sort order
  //Checking validity of orderBy serachParam and set it to a query object for prisma prisma
  //1. Map each column value into another array
  //2. check if our searchParam is within that array
  //3. Returned object used by prisma to sort, or underfined
  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
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
    <>
      <IssuesHeader />
      <IssuesTable searchParams={searchParams} />
      <Pagination pageSize={pageSize} currentPage={page} itemCount={count} />
    </>
  );
};
//telling nextjs to NOT make this a static page.
export const dynamic = "force-dynamic";
export default IssuesPage;
