import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../validationSchemas";
import { getServerSession } from "next-auth";
import { authObject } from "@/app/auth/authObject";

//Function for adding a new issue into db
export async function POST(request: NextRequest) {
  //Current user session in a server componenet
  const session = await getServerSession(authObject);

  //Return stautus 401 unauthorized if there is no user session
  if (!session) return NextResponse.json({}, { status: 401 });

  //Body of incoming request
  const body = await request.json();

  //validating the body against our schema
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  //Finally create a new issue if all checks are passed
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
