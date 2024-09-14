import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssuesHeader = () => {
  return (
    <Flex className="mb-4">
      <Button>
        <Link href="/issues/new" prefetch={true}>
          New issue
        </Link>
      </Button>
    </Flex>
  );
};

export default IssuesHeader;
