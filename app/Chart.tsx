"use client";
import { Card } from "@radix-ui/themes";
import React from "react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const Chart = ({ open, closed, inProgress }: Props) => {
  const data = [
    {
      label: "Open",
      value: open,
    },
    {
      label: "In Progress",
      value: inProgress,
    },
    {
      label: "Closed",
      value: closed,
    },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <YAxis />
          <XAxis dataKey={"label"} />

          <Bar
            dataKey={"value"}
            barSize={16}
            style={{
              fill: "var(--accent-9)",
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
