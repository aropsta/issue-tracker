"use client";
import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  issueId: number;
}
const DeleteButton = ({ issueId }: Props) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function deleteIssue() {
    try {
      setIsDeleting(true);
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues/list");
      router.refresh();
    } catch (err) {
      setIsDeleting(false);
      setError(true);
    }
  }
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button disabled={isDeleting} color="red">
            Delete Issue
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to <strong>permanantly</strong> delete this
            issue?
          </AlertDialog.Description>
          <Flex gap="3" align="center" mt="4" justify="end">
            <AlertDialog.Action>
              <Button color="red" onClick={async () => deleteIssue()}>
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
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>Delete Failed</AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt="4"
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteButton;
