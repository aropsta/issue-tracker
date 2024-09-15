"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { MaskOnIcon } from "@radix-ui/react-icons";
import { Avatar, Button, DropdownMenu } from "@radix-ui/themes";
import { AiFillBug } from "react-icons/ai";
import { useSession } from "next-auth/react";

import classnames from "classnames";
import { Box, Container, Flex } from "@radix-ui/themes";

const NavBar = () => {
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues/list",
    },
  ];
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 py-3">
      <Container>
        <Flex className="flex justify-between items-center">
          <Flex className="gap-3">
            <Link href="/" className="self-center ">
              {/* <MaskOnIcon /> */}
              <AiFillBug />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={classnames({
                      "text-zinc-800": link.href === currentPath,
                      "text-zinc-500": link.href !== currentPath,
                      "hover:text-zinc-800 transition-colors hover:border-b-2 border-orange-500":
                        true,
                    })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          {status === "authenticated" && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar
                  src={session.user!.image!}
                  fallback="?"
                  size="3"
                  className="cursor-pointer hover:brightness-75"
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>{session.user?.email}</DropdownMenu.Label>
                <DropdownMenu.Item>
                  <Link
                    href="/api/auth/signout"
                    className="w-[100%] h-[100%] content-center"
                  >
                    Sign out
                  </Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
          {status === "unauthenticated" && (
            <Link href="/api/auth/signin">
              <Button
                variant="surface"
                className="cursor-pointer hover:brightness-95"
              >
                Sign in
              </Button>
            </Link>
          )}
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
