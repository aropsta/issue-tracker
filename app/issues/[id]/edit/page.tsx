import prisma from "@/prisma/client";
import React from "react";
import IssueEditor from "../../_Components/IssueEditor";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}
const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <IssueEditor issue={issue} />;
};

export default EditIssuePage;
