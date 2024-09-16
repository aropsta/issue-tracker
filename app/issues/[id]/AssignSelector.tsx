import { Select } from "@radix-ui/themes";
import React from "react";

const AssignSelector = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign to..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Users</Select.Label>
          <Select.Item value="1">Robba Dengs</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssignSelector;
