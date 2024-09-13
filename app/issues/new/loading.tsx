import { Box, Flex, Spinner } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/components";

const LoadNewIssuePage = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default LoadNewIssuePage;
