import { Status, Issue } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";

interface Props {
  status: Status;
}
//defining a key value pair with typescript record
const statusMap: Record<
  Status,
  { label: string; color: "red" | "green" | "violet" }
> = {
  OPEN: {
    label: "Open",
    color: "red",
  },
  IN_PROGRESS: {
    label: "In progress",
    color: "violet",
  },
  CLOSED: {
    label: "Closed",
    color: "green",
  },
};
const IssueStatusBadge = ({ status }: Props) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
