import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssuesPage = () => {
  return <Link href="/issues/new">New issue</Link>;
};

export default IssuesPage;
