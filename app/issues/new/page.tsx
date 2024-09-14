import delay from "delay";
import dynamic from "next/dynamic";
import EditorLoading from "@/app/issues/_components/EditorLoading";

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

export default NewIssuePage;
