"use client";
import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

//Component for passing our session down to components. Can't use it in main layout file as its ssr'd

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
