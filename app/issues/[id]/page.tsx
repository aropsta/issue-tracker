import prisma from "@/prisma/client";
import { Box, Button, Callout, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditButton from "./EditButton";
import IssueDetails from "./IssueDetails";
import DeleteButton from "./DeleteButton";
import { cache } from "react";
import { getServerSession } from "next-auth";
import { authObject } from "@/app/auth/authObject";
import AssignSelector from "./AssignSelector";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import delay from "delay";

interface Props {
  params: {
    id: string;
  };
}

//cache function from react so first request is saved with subsequent reqests obtained from the cache and not from backend
//Getting a user from cache after first time instead of making multiple db queries
const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId },
  }),
);

const IssueDetailsPage = async ({ params: { id } }: Props) => {
  //Current user session in a server componenet
  const session = await getServerSession(authObject);

  //issue from db
  const issue = await fetchIssue(parseInt(id));

  //showing nextjs 'not found' page if issue wasn't found
  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      {/* tailwindcss md = radixUI sm */}
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>

      {/* Only render delete and edit buttons if there is a user session */}
      <Flex className="col-span-1" direction="column" gap="3">
        {session ? (
          <>
            <EditButton issueId={issue.id} />
            <DeleteButton issueId={issue.id} />
            <AssignSelector issue={issue} />
          </>
        ) : (
          <Callout.Root className="">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              Sign in with Google to see more options!
            </Callout.Text>
          </Callout.Root>
        )}
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

export default IssueDetailsPage;
