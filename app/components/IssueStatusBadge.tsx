import { Status, Issue } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

interface Props {
  status: Status;
}
//defining a key value pair with typescript record
const statusMap: Record<
  Status,
  { label: string; color: "green" | "gray" | "blue" }
> = {
  OPEN: {
    label: "Open",
    color: "blue",
  },
  IN_PROGRESS: {
    label: "In progress",
    color: "green",
  },
  CLOSED: {
    label: "Closed",
    color: "gray",
  },
};
const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
