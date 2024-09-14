"use client";
import { Status } from "@prisma/client";
import { Button, Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useRef, useState } from "react";
import ClearButton from "./ClearButton";

//Array to use to map our Select.Item elements
const statuses: { label: string; value: Status | "ALL" }[] = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Open",
    value: "OPEN",
  },
  {
    label: "In Progress",
    value: "IN_PROGRESS",
  },
  {
    label: "Closed",
    value: "CLOSED",
  },
];

const StatusFilter = () => {
  const router = useRouter();
  //get the current query String parameters in the url
  const urlParams = useSearchParams();

  const [value, setValue] = useState(urlParams.get("status") || "");

  function onSelectionChange(status: string) {
    //creating a new url to be able to append queries to easily
    const params = new URLSearchParams();

    if (status) params.append("status", status);
    if (urlParams.get("orderBy"))
      params.append("orderBy", urlParams.get("orderBy")!);

    //If there are parameters, append a ? to the queryString
    const queryParam = params.size ? "?" + params.toString() : "";
    router.push(`/issues/list/${queryParam}`);
    setValue(status);
    router.refresh();
  }

  function onReset() {
    router.push(`/issues/list`);
    setValue("");
  }

  return (
    <>
      <Select.Root
        value={value}
        onValueChange={(status) => onSelectionChange(status)}
      >
        <Select.Trigger placeholder="Filter by status..." />
        <Select.Content>
          {statuses.map((status) => (
            <Select.Item key={status.value} value={status.value}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      {/* Show clear fitlers button only if url params are >= 1 AND its not equal to 1 and only filted by page */}
      {!(urlParams.size === 1 && urlParams.has("page")) &&
        urlParams.size >= 1 && (
          <Button
            size="1"
            onClick={onReset}
            variant="soft"
            className="cursor-pointer"
          >
            Clear Filters
          </Button>
        )}
    </>
  );
};

export default StatusFilter;
