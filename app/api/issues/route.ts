import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../validationSchemas";

//Function for adding a new issue into db
export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });
  console.log("New Data on Server: ", newIssue);
  return NextResponse.json(newIssue, { status: 201 });
}
