import "./globals.css";
import type { Metadata } from "next";
import { Kanit } from "next/font/google";

const roboto = Kanit({ weight: "300", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Client LLM",
  description: "Client LLM",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
