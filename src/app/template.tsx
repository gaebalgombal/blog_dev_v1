import type { Metadata } from "next";

import "../styles/globals.css";

import { Navbar } from "@/components/template/navbar";

const lang = "en";

export const metadata: Metadata = {
  title: "Devlo9",
  description: "Hello World! This is Devlo9.",
};

export default function Template({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <div>
      <Navbar params={{ lang }} />
      {children}
    </div>
  );
}
