"use client";
import {
  Box,
  Button,
  Callout,
  Flex,
  Spinner,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import dynamic from "next/dynamic";

import { useForm, Controller, Form } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import React from "react";
import delay from "delay";

//Simple MDE stuff
import "easymde/dist/easymde.min.css";
import { Issue } from "@prisma/client";
//Lazy Loading simpleMDE component--------
//  //Browser errors if this component is not extracted into a forward ref because SimpleMDE doesn't handle the ref prop that react hook forms Controller passes to it.
const MarkdownEditor = React.forwardRef((props, ref) => (
  <SimpleMDE placeholder="Descripion" {...props} />
));
MarkdownEditor.displayName = "SimpleMDE";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
//-----------

//inferring type from our form schema rather than creating an interface
type IssueForm = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue;
}

//TODO: Add ability to update issue status
const IssueEditor = ({ issue }: Props) => {
  //react-hook-form initialization
  //passing object with resolver makes it be able to intergrated with other form validators: zod
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema),
  });

  //nextjs router
  const router = useRouter();

  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  //function to submit form data to server
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await delay(3300);
      await axios.post("/api/issues", data);
      //redirect user back to issues page
      router.push("/issues");
      console.log("Posted", errors);
    } catch (err) {
      setError(true);
      setSubmitting(false);
      console.log("Error", err);
    }
  });

  return (
    <Box className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5">
          <Callout.Icon>
            <ExclamationTriangleIcon />
          </Callout.Icon>
          <Callout.Text>
            There was an error submiting your request.
          </Callout.Text>
        </Callout.Root>
      )}

      <form onSubmit={onSubmit} className="space-y-3">
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          className=""
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        {/* Must wrap simpleMDE in a controller from react hook form as simpleMDE component doesnt support additional props with spread operator */}
        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          // TODO: Customize markdown editor */}
          render={({ field }) => <MarkdownEditor {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button className="self-start">
          {isSubmitting && <Spinner />}
          {!issue ? "Submit New Issue" : "Save"}
        </Button>
      </form>
    </Box>
  );
};

export default IssueEditor;
