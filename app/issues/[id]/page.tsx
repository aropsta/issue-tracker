import prisma from "@/prisma/client";
import { Box, Button, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditButton from "./EditButton";
import IssueDetails from "./IssueDetails";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { cache } from "react";

interface Props {
  params: {
    id: string;
  };
}

//Getting a user from cache after first time instead of making multiple db queries
const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId },
  }),
);

const IssueDetailPage = async ({ params: { id } }: Props) => {
  // const issue = await prisma.issue.findUnique({
  //   where: { id: parseInt(id) },
  // });

  const issue = await fetchIssue(parseInt(id));

  //showing nextjs 'not found' page if issue wasn't found
  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      {/* tailwind md = radix sm */}
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Flex className="col-span-1" direction="column" gap="3">
        <EditButton issueId={issue.id} />
        <DeleteButton issueId={issue.id} />
      </Flex>
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}

export default IssueDetailPage;
