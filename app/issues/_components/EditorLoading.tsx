import { Skeleton } from "@/app/components";
import { Flex } from "@radix-ui/themes";
import React from "react";

const EditorLoading = () => {
  return (
    <Flex className="max-w-xl space-y-3" direction="column">
      <Skeleton height="2rem" />
      <Skeleton height="23rem" />
      <Skeleton height="2.1rem" width="8.4rem" className="my-[2.5rem]" />
    </Flex>
  );
};

export default EditorLoading;
