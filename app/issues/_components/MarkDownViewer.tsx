"use client";
import { Issue } from "@prisma/client";
import { Card } from "@radix-ui/themes";
import { useTheme } from "next-themes";
import React from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  issue: Issue;

  //
}
const MarkDownViewer = ({ issue }: Props) => {
  const { theme } = useTheme();
  const fontColor =
    theme === "dark"
      ? "text-stone-300 prose-dark"
      : "text-zinc-800 prose-light";
  return (
    <Card className={`prose max-w-full ${fontColor}`} mt="4">
      <ReactMarkdown>{issue.description}</ReactMarkdown>
    </Card>
  );
};

export default MarkDownViewer;
