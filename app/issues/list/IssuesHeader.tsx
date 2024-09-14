import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import StatusFilter from "./StatusFilter";

const IssuesHeader = () => {
  return (
    <Flex mb="4" justify="between">
      <StatusFilter />
      <Button>
        <Link href="/issues/new" prefetch={true}>
          New issue
        </Link>
      </Button>
    </Flex>
  );
};

export default IssuesHeader;
