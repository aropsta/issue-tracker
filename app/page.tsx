import React from "react";
import LatestIssues from "./LatestIssues";
import Chart from "./Chart";
import Summary from "./Summary";
import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

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
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <Summary
          open={openCount}
          closed={closedCount}
          inProgress={progressCount}
        />
        <Chart
          open={openCount}
          closed={closedCount}
          inProgress={progressCount}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  );
};

//Exporting meta data for title and stuff
export const metadata: Metadata = {
  title: "Issue Track - Dashboard",
  description: "View a summary of currently submitted issues",
};
export default page;
