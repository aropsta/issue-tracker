import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import delay from "delay";
import { NextRequest, NextResponse } from "next/server";

//This file contains all endpoints of our API for updating, adding and deleting from our database

interface Props {
  params: {
    id: string;
  };
}
export async function PATCH(request: NextRequest, { params }: Props) {
  //Received request body
  const body = await request.json();

  //Creating validation object from our zod schema, passing it the request Body
  const validation = issueSchema.safeParse(body);

  //if validation of form fails, return the errors and status 400: bad request
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  //get our issue to edit from db
  const issueToEdit = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  //if not found, return error and 404 not found status
  if (!issueToEdit)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  //Update our issue
  const updatedIssue = await prisma.issue.update({
    where: { id: issueToEdit.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  //Then Return it
  return NextResponse.json(updatedIssue);
}

//Mostly the same as PATCH method. Just deleting instead of updating
export async function DELETE(request: NextRequest, { params }: Props) {
  await delay(2000);
  //get our issue to edit from db
  const issueToDel = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issueToDel)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  await prisma.issue.delete({
    where: { id: parseInt(params.id) },
  });

  //returning empty object after succesful deletion
  return NextResponse.json({});
}
