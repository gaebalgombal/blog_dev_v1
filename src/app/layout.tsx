import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Devlo9",
  description: "Hello World! This is Devlo9.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
