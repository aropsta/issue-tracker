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
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, Form } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiAlertFill } from "react-icons/ri";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

// interface IssueForm {
//   title: string;
//   description: string;
// }

//inferring type from our form schema rather than creating an interface
type IssueForm = z.infer<typeof issueSchema>;

const NewIssuePage = () => {
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

  //function to submit form data to server
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues", data);
      //redirect user back to issues page
      router.push("/issues");
      console.log("Posted", errors);
    } catch (err) {
      // setError(true);
      setSubmitting(false);
      console.log("Error", err);
    }
  });

  return (
    <Box className="max-w-xl">
      {/* {error && ( */}
      {/*   <Callout.Root className="mb-5"> */}
      {/*     <Callout.Icon> */}
      {/*       <RiAlertFill /> */}
      {/*     </Callout.Icon> */}
      {/*     <Callout.Text> */}
      {/*       There was an error submiting your request. */}
      {/*     </Callout.Text> */}
      {/*   </Callout.Root> */}
      {/* )} */}

      <form onSubmit={onSubmit} className="space-y-3">
        <TextField.Root
          placeholder="Title"
          className=""
          {...register("title")}
        ></TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        {/* Must wrap simpleMDE in a controller from react hook form as simpleMDE component doesnt support additional props with spread operator */}
        <Controller
          name="description"
          control={control}
          // TODO: Customize markdown editor */}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" className="" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button className="self-start">
          Submit New Issue
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </Box>
  );
};

export default NewIssuePage;
