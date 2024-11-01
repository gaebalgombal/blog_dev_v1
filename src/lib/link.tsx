"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import classNames from "classnames";

import layoutStyles from "@/styles/layout.module.css";
import navbarStyles from "@/styles/navbar.module.css";

type Link = { href: { pathname: string }; children: any };

function ConditionalLink(link: Link) {
  const pathname = usePathname();
  const ifCurrentLink = pathname === link.href.pathname;

  const handleClick = (event: any) => {
    if (ifCurrentLink) {
      // Prevent the default action if the link is the current page
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
}

function ButtonLink(link: Link) {
  const pathname = usePathname();

  const iconClass = classNames({
    "material-icons": true,
    [navbarStyles.icons]: true,
  });

  return (
    <Link href={link.href} passHref>
      <p>
        {link.children}
        <span className={iconClass}> keyboard_arrow_down </span>
      </p>
    </Link>
  );
}

export { ConditionalLink, ButtonLink };
