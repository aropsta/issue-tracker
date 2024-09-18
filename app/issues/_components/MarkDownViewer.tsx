"use client";
import { Issue } from "@prisma/client";
import { Card } from "@radix-ui/themes";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  issue: Issue;
}
const MarkDownViewer = ({ issue }: Props) => {
  const { resolvedTheme } = useTheme();

  //This hook and state are used for the Switch componenet. Without them the check state is unreliable on page refreshes. We ensure that as soon as resolvedTheme is available, we set the checked state
  const [darkmode, setDarkmode] = useState(false);
  useEffect(() => {
    setDarkmode(resolvedTheme === "dark");
  }, [resolvedTheme]);

  const fontColor = darkmode
    ? "text-stone-300 prose-dark"
    : "text-zinc-800 prose-light";

  return (
    <Card className={`prose max-w-full ${fontColor}`} mt="4">
      <ReactMarkdown className={fontColor}>{issue.description}</ReactMarkdown>
    </Card>
  );
};

export default MarkDownViewer;
