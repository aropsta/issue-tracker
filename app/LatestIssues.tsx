import prisma from "@/prisma/client";
import { Card, Flex, Heading, Table } from "@radix-ui/themes";
import { IssueStatusBadge } from "./components";
import Link from "next/link";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "asc" },
    take: 5,
  });

  return (
    <Card>
      <Heading size="4" my="3" mx="3">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link className="block mb-1" href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
