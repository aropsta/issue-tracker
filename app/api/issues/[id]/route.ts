import { authObject } from "@/app/auth/authObject";
import { createIssueSchema, patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import delay from "delay";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

//This file contains all endpoints of our API for updating, adding and deleting from our database

interface Props {
  params: {
    id: string;
  };
}
export async function PATCH(request: NextRequest, { params }: Props) {
  //Current user session in a server componenet
  const session = await getServerSession(authObject);
  //Return stautus 401 unauthorized if there is no user session
  // if (!session) return NextResponse.json({}, { status: 401 });

  //Received request body
  const body = await request.json();
  const { assignedToUserId, title, description } = body;
  //Creating validation object from our zod schema, passing it the request Body
  const validation = patchIssueSchema.safeParse(body);

  console.log("new request", body);
  //if validation of form fails, return the errors and status 400: bad request
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  //Validation for assignedToUserId field
  //If theres than assignedToUserId field
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });
    //If theres no user with that ID
    if (!user)
      return NextResponse.json(
        {
          error: "Invalid User.",
        },
        //400 - bad request
        { status: 400 },
      );
  }

  //get our issue to edit from db with the id from the url where request came from
  const issueToEdit = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  //if not found, return error and 404 not found status
  if (!issueToEdit)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  //Update our issue
  //If any of these properties are undefined, prisma will not update them
  const updatedIssue = await prisma.issue.update({
    where: { id: issueToEdit.id },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });
  //Then Return it
  return NextResponse.json(updatedIssue);
}

//Mostly the same as PATCH method. Just deleting instead of updating
export async function DELETE(request: NextRequest, { params }: Props) {
  //Current user session in a server componenet
  const session = await getServerSession(authObject);
  //Return stautus 401 unauthorized if there is no user session
  if (!session) return NextResponse.json({}, { status: 401 });

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
