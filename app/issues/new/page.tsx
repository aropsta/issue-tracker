"use client";
import { Button, Flex, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller, Form } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  //react-hook-form initialization
  const { register, control, handleSubmit } = useForm<IssueForm>();

  //nextjs router
  const router = useRouter();

  //function to submit form data to server
  async function submitRequest(data: IssueForm) {
    await axios.post("/api/issues", data);
    //redirect user back to issues page
    router.push("/issues");
  }

  return (
    <form
      className="space-y-3 max-w-xl"
      onSubmit={handleSubmit((data) => submitRequest(data))}
    >
      <TextField.Root
        placeholder="Title"
        className=""
        {...register("title")}
      ></TextField.Root>

      {/* Must wrap simpleMDE in a controller from react hook form as simpleMDE component doesnt support additional props with spread operator */}
      <Controller
        name="description"
        control={control}
        // TODO: Customize markdown editor */}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" className="" {...field} />
        )}
      />
      <Button className="self-start">Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
