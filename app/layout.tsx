import "./globals.css";
import "./theme-config.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="winter" lang="en">
      <body className={inter.variable}>
        <Theme
          accentColor="tomato"
          grayColor="olive"
          panelBackground="solid"
          radius="small"
        >
          <NavBar />
          <main className="p-4">
            <Container>{children}</Container>
          </main>
          {/* Component to pick radix ui them, then copy it */}
          {/* <ThemePanel></ThemePanel> */}
        </Theme>
      </body>
    </html>
  );
}
