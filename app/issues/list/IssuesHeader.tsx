import { Box, Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import StatusFilter from "./StatusFilter";
import { IssueQuery } from "./IssuesTable";

const IssuesHeader = () => {
  return (
    <Flex justify="between">
      <Flex gap="2" align="center">
        <StatusFilter />
      </Flex>
      <Button m="0" className="p-0">
        <Link
          href="/issues/new"
          className="px-3 h-[100%] w-[100%] content-center"
        >
          New issue
        </Link>
      </Button>
    </Flex>
  );
};

export default IssuesHeader;
