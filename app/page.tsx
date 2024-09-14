import React from "react";
import Pagination from "./components/Pagination";

const page = ({ searchParams }: { searchParams: { page: string } }) => {
  return (
    <Pagination
      itemCount={100}
      pageSize={9}
      currentPage={parseInt(searchParams.page)}
    />
  );
};

export default page;
