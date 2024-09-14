import { Button } from "@radix-ui/themes";
import React from "react";

interface Props {
  issueId: number;
}
const DeleteButton = ({ issueId }: Props) => {
  return <Button color="red">Delete Issue</Button>;
};

export default DeleteButton;
