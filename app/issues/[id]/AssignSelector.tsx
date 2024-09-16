"use client";
import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Text, Button, Flex, Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Props {
  issue: Issue;
}
const AssignSelector = ({ issue }: Props) => {
  const [value, setValue] = useState(issue.assignedToUserId || "");
  //React query getting data from api
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 1000 * 60 * 15, //15mins
  });

  console.log("Value", issue.assignedToUserId);
  function valueChanged(userId: string) {
    setValue((v) => userId);

    const requestBod = {
      assignedToUserId: userId || null,
    };
    axios.patch("/api/issues/" + issue.id, requestBod);
  }

  if (error) return null;
  if (isLoading) return <Skeleton height="1.75rem"></Skeleton>;
  return (
    <Flex direction="column">
      <Text className="self-center">User</Text>
      <Select.Root
        defaultValue={value}
        value={value}
        onValueChange={(value) => valueChanged(value)}
      >
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
            valueChanged("");
          }}
        >
          <strong>Unassign user</strong>
        </Button>
      )}
    </Flex>
  );
};

export default AssignSelector;
