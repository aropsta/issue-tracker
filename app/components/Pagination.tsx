"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}
const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  function changePage(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  }

  return (
    <Flex gap="4">
      {/* first */}
      <Button
        disabled={currentPage === 1}
        onClick={() => {
          changePage(1);
          console.log("current Page: ", currentPage);
        }}
      >
        <DoubleArrowLeftIcon />
      </Button>
      {/* prev */}
      <Button
        disabled={currentPage === 1}
        onClick={() => {
          console.log("current Page: ", currentPage);
          changePage(currentPage - 1);
        }}
      >
        <ChevronLeftIcon />
      </Button>
      <Text size="2">
        Page {currentPage} of {pageCount}
      </Text>
      {/* next */}
      <Button
        disabled={currentPage === pageCount}
        onClick={() => {
          console.log("current Page: ", currentPage);
          changePage(currentPage + 1);
        }}
      >
        <ChevronRightIcon />
      </Button>
      {/* last */}
      <Button
        disabled={currentPage === pageCount}
        onClick={() => {
          console.log("current Page: ", currentPage);
          changePage(pageCount);
        }}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
