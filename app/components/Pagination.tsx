"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import React, { useState } from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}
const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const [page, setPage] = useState(currentPage);
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;
  return (
    <Flex gap="4">
      {/* first */}
      <Button disabled={page === 1} onClick={() => setPage(1)}>
        <DoubleArrowLeftIcon />
      </Button>
      {/* prev */}
      <Button disabled={page === 1} onClick={() => setPage((prev) => --prev)}>
        <ChevronLeftIcon />
      </Button>
      <Text>
        Page: {page} of {pageCount}
      </Text>
      {/* next */}
      <Button
        disabled={page === pageCount}
        onClick={() => setPage((prev) => ++prev)}
      >
        <ChevronRightIcon />
      </Button>
      {/* last */}
      <Button disabled={page === pageCount} onClick={() => setPage(pageCount)}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
