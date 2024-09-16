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
import Skeleton from "./components/Skeleton";

const NavBar = () => {
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 py-3">
      <Container>
        <Flex className="flex justify-between items-center">
          <Flex className="gap-3">
            <Link href="/" className="self-center ">
              {/* <MaskOnIcon /> */}
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <UserStatus />
        </Flex>
      </Container>
    </nav>
  );
};
function NavLinks() {
  const currentPath = usePathname();
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
  return (
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
  );
}

function UserStatus() {
  const { status, data: session } = useSession();

  //return different markup according to nextauth session/status
  if (status === "loading") return <Skeleton width="4rem" height="2.3rem" />;
  if (status === "unauthenticated")
    return (
      <>
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
      </>
    );

  if (status === "authenticated")
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session.user!.image!}
            fallback="U"
            size="3"
            className="cursor-pointer hover:brightness-75"
            // referrerPolicy Sometimes helps google images load
            referrerPolicy="no-referrer"
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
    );
}
export default NavBar;
