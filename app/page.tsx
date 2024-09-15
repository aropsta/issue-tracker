import React from "react";
import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";

const page = ({ searchParams }: { searchParams: { page: string } }) => {
  return <LatestIssues />;
};

export default page;
