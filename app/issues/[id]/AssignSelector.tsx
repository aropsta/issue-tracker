"use client";
import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Text, Button, Flex, Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  issue: Issue;
}
const AssignSelector = ({ issue }: Props) => {
  //value of selector
  const [value, setValue] = useState(issue.assignedToUserId || "");

  //custom hook to get list of users
  //using react query
  const { data: users, error, isLoading } = useUsers();

  async function assignUser(userId: string) {
    setValue(userId);
    await axios
      .patch("/api/issues/" + issue.id, {
        assignedToUserId: userId || null,
      })
      .catch((err) => {
        toast.error("Changes could not be saved.");
      });
  }

  if (error) return null;
  if (isLoading) return <Skeleton height="1.75rem"></Skeleton>;
  return (
    <Flex direction="column">
      <Toaster />
      <Select.Root value={value} onValueChange={assignUser}>
        <Select.Trigger placeholder="Assign to..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Users</Select.Label>
            {users?.map((u) => (
              <Select.Item key={u.id} value={u.id}>
                {u.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      {value && (
        <Button
          variant="ghost"
          size="1"
          className="cursor-pointer self-end"
          onClick={() => {
            assignUser("");
          }}
        >
          <strong>Unassign user</strong>
        </Button>
      )}
    </Flex>
  );
};

//custom hook uses react query to make a request to get users
function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 1000 * 60 * 15, //15mins
  });
}

export default AssignSelector;
