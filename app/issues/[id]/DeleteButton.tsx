"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  issueId: number;
}
const DeleteButton = ({ issueId }: Props) => {
  const router = useRouter();
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete Issue</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to <strong>permanantly</strong> delete this
          issue?
        </AlertDialog.Description>
        <Flex gap="4" align="center" mt="4" justify="end">
          <AlertDialog.Action>
            <Button
              color="red"
              onClick={() => {
                axios.delete("/api/issues/" + issueId);
                router.push("/issues");
                router.refresh();
              }}
            >
              Delete
            </Button>
          </AlertDialog.Action>
          <AlertDialog.Cancel>
            <Button variant="surface" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteButton;
