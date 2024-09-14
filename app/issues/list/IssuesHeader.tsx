import { Box, Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import StatusFilter from "./StatusFilter";
import ClearButton from "./ClearButton";
import { IssueQuery } from "./IssuesTable";

const IssuesHeader = ({ searchParam }: { searchParam: IssueQuery }) => {
  return (
    <Flex justify="between">
      <Flex gap="2" align="center">
        <StatusFilter />
      </Flex>
      <Button>
        <Link href="/issues/new" prefetch={true}>
          New issue
        </Link>
      </Button>
    </Flex>
  );
};

export default IssuesHeader;
