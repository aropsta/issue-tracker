import prisma from "@/prisma/client";
import React from "react";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Loader from "./loading";

interface Props {
  params: { id: string };
}

//Dynamically loading our editor. Or 'Lazy loading' it
const IssueEditor = dynamic(
  () => import("@/app/issues/_components/IssueEditor"),
  {
    loading: () => <Loader />,
    ssr: false,
  },
);
const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <IssueEditor issue={issue} />;
};

export default EditIssuePage;
