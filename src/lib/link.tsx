"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import typoStyles from "@/styles/typography.module.css";
import navbarStyles from "@/styles/navbar.module.css";

import classNames from "classnames";

type Link = { href: { pathname: string }; children: any };
type Params = {params : {key: string, value: string}};

const LangLink = ({ params: { key, value } } : Params) => {  
  const pathname = usePathname().split('/');
  const cur = pathname[1];
  const to = '/' + key + '/' + pathname.slice(2).join('/');

  const hover = classNames({
    [typoStyles["signature_en"]]: true,
    [typoStyles["signature_en"]]: key === 'en' ? true : false,
    [typoStyles["signature_kr"]]: key === 'kr' ? true : false,
  })

  return (
    <Link href={to}>
      <p className={hover} >
        {value}
      </p>
    </Link>
  );
};

const MenuLink = ({ params: { key, value } } : Params) => {
  const pathname = usePathname().split('/') || [];
  const curLang = pathname[1] || '';
  const curMenu = pathname[2] || '';

  const to = '/' + curLang + '/' + key;

  const activeOrHover = classNames({
    [navbarStyles["visible"]]: true,
    [typoStyles["signature_en"]]: true,
    [typoStyles["signature_en"]]: curLang === 'en' ? true : false,
    [typoStyles["signature_kr"]]: curLang === 'kr' ? true : false,
    [navbarStyles["active"]]: curMenu === value ? true : false,
  });

  return (
    <Link href={to}>
      <div>
        <span className={navbarStyles.hidden}>{value}</span>
        <p className={activeOrHover}>
          {value}
        </p>
      </div>
    </Link>
  );
};


const AnchorLink = (link: Link) => {
  const pathname = usePathname().split('/') || [];
  const curLang = pathname[1] || '';

  const activeOrHover = classNames({
    [typoStyles["signature_color"]]: true,
    [typoStyles["signature_en"]]: true,
    [typoStyles["signature_en"]]: curLang === 'en' ? true : false,
    [typoStyles["signature_kr"]]: curLang === 'kr' ? true : false,
  });

  return(
    <Link href={`#${link.href.pathname.replaceAll(" ", "-").toLowerCase()}`}>
      <span className={activeOrHover}>
        {link.href.pathname}
      </span>
    </Link>
  );
};

export { LangLink, MenuLink, AnchorLink };
