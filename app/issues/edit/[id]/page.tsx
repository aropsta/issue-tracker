import prisma from "@/prisma/client";
import React from "react";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Loader from "./loading";
import { Metadata } from "next";

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
  //Getting our issue from db
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  //render editor, passing it details of issue
  return <IssueEditor issue={issue} />;
};

//Exporting page meta data for title and stuff
export const metadata: Metadata = {
  title: "Issue Track - Edit an issue",
  description: "Modify an existing issue",
};
export default EditIssuePage;
