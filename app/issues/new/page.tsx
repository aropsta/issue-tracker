"use client";
import {
  Box,
  Button,
  Callout,
  Flex,
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

  const [error, setError] = useState(false);

  //function to submit form data to server
  async function submitRequest(data: IssueForm) {
    try {
      await axios.post("/api/issues", data);
      //redirect user back to issues page
      router.push("/issues");
    } catch (error) {
      setError(true);
    }
  }

  return (
    <Box className="max-w-xl">
      {error && (
        <Callout.Root className="mb-5">
          <Callout.Icon>
            <RiAlertFill />
          </Callout.Icon>
          <Callout.Text>
            There was an error submiting your request.
          </Callout.Text>
        </Callout.Root>
      )}

      <form
        onSubmit={handleSubmit((data) => submitRequest(data))}
        className="space-y-3"
      >
        <TextField.Root
          placeholder="Title"
          className=""
          {...register("title")}
        ></TextField.Root>
        {errors.title && (
          <Text className="block" color="red">
            {errors.title.message}
          </Text>
        )}

        {/* Must wrap simpleMDE in a controller from react hook form as simpleMDE component doesnt support additional props with spread operator */}
        <Controller
          name="description"
          control={control}
          // TODO: Customize markdown editor */}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" className="" {...field} />
          )}
        />
        {errors.title && (
          <Text color="red" className="block my-0">
            {errors.title.message}
          </Text>
        )}
        <Button className="self-start">Submit New Issue</Button>
      </form>
    </Box>
  );
};

export default NewIssuePage;
