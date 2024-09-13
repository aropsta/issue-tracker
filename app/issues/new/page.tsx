"use client";
import { Button, Flex, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
  return (
    <Flex direction={"column"} className="space-y-3 max-w-xl ">
      <TextField.Root placeholder="Title" className=""></TextField.Root>
      {/* TODO: Customize markdown editor */}
      <SimpleMDE placeholder="Description" className="" />
      <Button className="self-start">Submit New Issue</Button>
    </Flex>
  );
};

export default NewIssuePage;
