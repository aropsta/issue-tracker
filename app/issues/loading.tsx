import { Box, Button, Table } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";
import IssuesHeader from "./IssuesHeader";

const LoadingIssuesPage = () => {
  const skeletons = [1, 2, 3, 4, 5];
  return (
    <>
      <IssuesHeader />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {skeletons.map((issue, i) => (
            <Table.Row key={i}>
              <Table.Cell>
                <Skeleton></Skeleton>

                <Box className="block md:hidden">
                  <Skeleton></Skeleton>
                </Box>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton></Skeleton>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton></Skeleton>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default LoadingIssuesPage;
