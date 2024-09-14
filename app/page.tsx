import React from "react";
import Pagination from "./components/Pagination";

const page = () => {
  return <Pagination itemCount={100} pageSize={9} currentPage={2} />;
};

export default page;
