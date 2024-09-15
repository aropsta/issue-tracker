import React from "react";
import LatestIssues from "./LatestIssues";
import Summary from "./Summary";
import prisma from "@/prisma/client";

const page = async ({ searchParams }: { searchParams: { page: string } }) => {
  const openCount = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const closedCount = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  const progressCount = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  return (
    <>
      <Summary
        open={openCount}
        closed={closedCount}
        inProgress={progressCount}
      />
      <LatestIssues />
    </>
  );
};

export default page;
