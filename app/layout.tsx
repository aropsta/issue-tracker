import "./globals.css";
import "./theme-config.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import AuthProvider from "./auth/Provider";
import QueryClientProvider from "./QueryClientProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Track and manage issues",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="winter" lang="en">
      <body className={inter.variable}>
        {/* query client provider for using react query */}
        <QueryClientProvider>
          {/* auth provider for using next-auth */}
          <AuthProvider>
            <ThemeProvider attribute="class">
              {/* reat ui theme wrapper */}
              <Theme
                accentColor="yellow"
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
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
