import { Issue } from "@prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  issueId: number;
}
const EditButton = ({ issueId }: Props) => {
  return (
    <Button m="0" className="p-0">
      <Link
        href={`/issues/edit/${issueId}`}
        className="flex justify-center px-3 h-[100%] w-[100%] items-center gap-1.5"
      >
        <Pencil2Icon />
        Edit Issue
      </Link>
    </Button>
  );
};

export default EditButton;
