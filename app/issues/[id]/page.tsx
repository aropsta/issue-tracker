import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Props {
  params: {
    id: string;
  };
}
const IssueDetailPage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  //showing nextjs 'not found' page if issue wasn't found
  console.log("hie");
  if (!issue) notFound();
  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="4" my="2" align="center">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      {/* prose for being able to render html typography */}
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
