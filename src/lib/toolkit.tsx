"use client";

import { usePathname } from "next/navigation";

const getLanguage = () => {
  const pathname = usePathname();

  if (pathname.includes(lang)) {
    return;
  }
};
