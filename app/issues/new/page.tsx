import delay from "delay";
import dynamic from "next/dynamic";
import EditorLoading from "@/app/issues/_components/EditorLoading";
import { Metadata } from "next";

//Dynamically loading our editor. Or 'Lazy loading' it
const IssueEditor = dynamic(
  () => import("@/app/issues/_components/IssueEditor"),
  {
    loading: () => <EditorLoading />,
    ssr: false,
  },
);

const NewIssuePage = () => {
  return <IssueEditor />;
};
//Exporting page meta data for title and stuff
export const metadata: Metadata = {
  title: "Issue Track - Add new issue",
  description: "Createa new issue",
};

export default NewIssuePage;
