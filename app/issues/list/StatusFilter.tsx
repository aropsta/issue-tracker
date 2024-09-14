"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

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

  function onSelectionChange(status: string) {
    //creating a new url to be able to append queries to easily
    const params = new URLSearchParams();

    if (status) params.append("status", status);
    if (urlParams.get("orderBy"))
      params.append("orderBy", urlParams.get("orderBy")!);

    //If there are parameters, append a ? to the queryString
    const queryParam = params.size ? "?" + params.toString() : "";
    router.push(`/issues/list/${queryParam}`);
  }

  return (
    <Select.Root
      defaultValue={urlParams.get("status") || ""}
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
  );
};

export default StatusFilter;
