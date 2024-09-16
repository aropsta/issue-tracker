"use client";
import { Issue } from "@prisma/client";
import { Card } from "@radix-ui/themes";
import { useTheme } from "next-themes";
import React from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  issue: Issue;
}
const MarkDownViewer = ({ issue }: Props) => {
  const { theme } = useTheme();
  const fontColor = theme === "light" ? "text-zinc-700" : "text-stone-300";
  return (
    <Card className={`prose max-w-full ${fontColor}`} mt="4">
      <ReactMarkdown>{issue.description}</ReactMarkdown>
    </Card>
  );
};

export default MarkDownViewer;
