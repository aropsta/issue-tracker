"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import { MaskOnIcon } from "@radix-ui/react-icons";
import {
  Text,
  Avatar,
  Button,
  DropdownMenu,
  Switch,
  Checkbox,
} from "@radix-ui/themes";
import { AiFillBug } from "react-icons/ai";
import { BsBug, BsBugFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
import icon from "../public/bug.png";

import classnames from "classnames";
import { Box, Container, Flex } from "@radix-ui/themes";
import Skeleton from "./components/Skeleton";
import { useTheme } from "next-themes";

const NavBar = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  console.log(theme);
  if (theme === "dark") console.log(true);
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 py-3">
      <Container>
        <Flex className="flex justify-between items-center">
          <Flex className="gap-3 items-center">
            <Link href="/">
              <Image
                className="self-center"
                src={icon}
                alt="bug"
                width={36}
                height={36}
              />
            </Link>
            <NavLinks theme={theme!} />
          </Flex>
          <Flex className="items-center" gap="2">
            <UserStatus />

            <Switch
              checked={resolvedTheme === "dark"}
              size="1"
              className="self-center"
              defaultChecked={false}
              onCheckedChange={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
            />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};
function NavLinks({ theme }: { theme: string }) {
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
            //Using library to dynamically assign class names
            className={classnames({
              "text-zinc-800 font-semibold":
                link.href === currentPath && theme === "light",
              "text-zinc-500": link.href !== currentPath && theme === "light",
              "text-stone-100 font-semibold":
                link.href === currentPath && theme === "dark",
              "text-stone-400": link.href !== currentPath && theme === "dark",
              "hover:text-zinc-800 transition-colors hover:border-b-2 border-yellow-400":
                theme === "light",
              "hover:text-stone-100 transition-colors hover:border-b-2 border-yellow-400":
                theme === "dark",
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
