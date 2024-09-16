"use client";
import { Skeleton } from "@/app/components";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssignSelector = () => {
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

  if (error) return null;
  if (isLoading) return <Skeleton height="1.75rem"></Skeleton>;

  return (
    <Select.Root>
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
  );
};

export default AssignSelector;
