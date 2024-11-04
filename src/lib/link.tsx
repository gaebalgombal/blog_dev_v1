"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import layoutStyles from "@/styles/layout.module.css";
import navbarStyles from "@/styles/navbar.module.css";

type Link = { href: { pathname: string }; children: any };

const ConditionalLink = (link: Link) => {
  const pathname = usePathname();
  const ifCurrentLink = pathname === link.href.pathname;

  const handleClick = (event: any) => {
    if (ifCurrentLink) {
      event.preventDefault();
      return true;
    }
  };

  return (
    <Link href={link.href} onClick={handleClick} passHref>
      <p className={ifCurrentLink ? navbarStyles.active : ""}>
        {link.children}
      </p>
    </Link>
  );
};

const AnchorLink = (link: Link) => {
  return (
    <Link href={`#${link.href.pathname.replaceAll(" ", "-").toLowerCase()}`}>
      {link.href.pathname}
    </Link>
  );
};

export { ConditionalLink, AnchorLink };
