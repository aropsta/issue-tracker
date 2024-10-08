import { Skeleton } from "@/app/components";
import { Box, Card, Flex, Heading, Spinner, Text } from "@radix-ui/themes";
import React from "react";

const LoadIssueDetails = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem"></Skeleton>
      <Flex gap="4" my="2" align="center">
        <Skeleton width={"2rem"}></Skeleton>
        <Skeleton width={"5rem"}></Skeleton>
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={3}></Skeleton>
      </Card>
    </Box>
  );
};

export default LoadIssueDetails;
