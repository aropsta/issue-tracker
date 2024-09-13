import React from "react";
import { Link as RadixLink } from "@radix-ui/themes";
import NextLink from "next/link";

//custom link component to have behvaiour of next Link while keeping styling of radixUI Link
//https://nextjs.org/docs/app/api-reference/components/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag
//

interface Props {
  href: string;
  children: string;
}
const Link = ({ href, children }: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
};

export default Link;
