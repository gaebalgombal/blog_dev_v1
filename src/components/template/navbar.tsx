"use client";

import { useState } from "react";

import classNames from "classnames";

import layoutStyles from "@/styles/layout.module.css";
import navbarStyles from "@/styles/navbar.module.css";
import typoStyles from "@/styles/typography.module.css";

import { LangLink, MenuLink } from "@/lib/link";
import { NAVBAR_LIST } from "@/config/const";
import { Word } from "@/config/types";

type Props = {
  params : {lang: string}
}

export const Navbar = ({ params: { lang } } : Props) => {
  const [isToggleActive, setToggleActive] = useState(false);

  const toggleDropdown = (event: any) => {
    setToggleActive((prev) => !prev);    
    event.preventDefault();

    return isToggleActive;
  };

  const dropDownDefault = classNames({
    [navbarStyles["dropdown"]]: true,
    [navbarStyles["default"]]: true,
  });

  const dropDownActive = classNames({
    [navbarStyles.dropdown]: true,
    [navbarStyles.active]: true,
  });

  const iconClass = classNames({
    "material-icons": true,
    [navbarStyles.icons]: true,
  });

  const signature = {
    [typoStyles["signature_color"]]: true,
    [typoStyles["signature_en"]]: true,
    [typoStyles["signature_en"]]: lang === 'en' ? true : false,
    [typoStyles["signature_kr"]]: lang === 'kr' ? true : false,
  };

  const h1Class = classNames({
    ...signature,
  });

  const liClass = classNames({
    ...signature,
    [navbarStyles["visible"]]: true
  });

  return (
    <nav className={layoutStyles.ly_navbar}>
      <div className={navbarStyles.bl_navbar}>
        <h1 className={h1Class}>
            <a href={`/${lang}/home`}>DEVLOG</a>
        </h1>
        <ul className={navbarStyles.list}>
          <li>
            <MenuLink params={{ 
              key: `home`,
              value: NAVBAR_LIST.home?.[lang as keyof Word]
            }}/>
          </li>
          <li>
            <MenuLink params={{ 
              key: `resume`,
              value: NAVBAR_LIST.resume?.[lang as keyof Word]
            }}/>
          </li>
          <li>
            <MenuLink params={{ 
              key: `portfolio`,
              value: NAVBAR_LIST.portfolio?.[lang as keyof Word]
            }}/>
          </li>
          <li>
            <MenuLink params={{ 
              key: `posts`,
              value: NAVBAR_LIST.posts?.[lang as keyof Word]
            }}/>
          </li>
          <li>
            <a href="" onClick={toggleDropdown}>
              <div>
                <span className={navbarStyles.hidden}>
                  {NAVBAR_LIST.language?.[lang as keyof Word]}
                  &nbsp;
                  <span className={iconClass}>keyboard_arrow_down</span>
                </span>
                <p className={liClass}>
                  {NAVBAR_LIST.language?.[lang as keyof Word]}
                  &nbsp;
                  <span className={iconClass}>keyboard_arrow_down</span>
                </p>
                {/* <p className={iconClass}> keyboard_arrow_down </p> */}
              </div>
            </a>
          </li>
          <li>
            <div className={isToggleActive ? dropDownActive : dropDownDefault}>
              <LangLink params={{ key: `kr`, value: '한국어' }}></LangLink>
              <LangLink params={{ key: `en`, value: 'English' }}></LangLink>
            </div>
          </li>
          {/* TODO: 다크모드 구현 */}
          {/* <li>
            <button
              className={navbarStyles["toggle-button"]}
              id="toggle-button"
            >
              <span className={wrapperClass}>
                <span className={iconClass}> wb_sunny </span>
              </span>
              <span className={wrapperDarkClass}>
                <span className={iconClass}> dark_mode </span>
              </span>
            </button>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};
