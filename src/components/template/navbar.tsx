"use client";

import { useState } from "react";
import classNames from "classnames";
import Cookies from 'js-cookie';

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
  const [isDarkActive, setDarkActive] = useState(false);

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

  let lightMode = classNames({
    [navbarStyles.icons_wrapper] : true,
    [navbarStyles.active] : Cookies.get('mode') !== 'dark' ? true : false,
  });

  let darkMode = classNames({
    [navbarStyles.icons_wrapper] : true,
    [navbarStyles.active] : Cookies.get('mode') === 'dark' ? true : false,
    [navbarStyles.dark_mode] : Cookies.get('mode') === 'dark'? true : false,
  });

  const handleButton = () => {
    const cur = Cookies.get('mode')
    const to = cur === 'dark' ? 'light' : 'dark';
    Cookies.set('mode', to, {expires: 1});
    setDarkActive((prev) => !prev);
    
    const after = Cookies.get('mode')
    
    if (after === 'dark') {
      document.body.classList.add("darkmode");
    } else if (after === 'light') {
      document.body.classList.remove("darkmode");
    }
    
    return isDarkActive;
  }

  return (
    <nav className={layoutStyles.ly_navbar}>
      <div className={navbarStyles.bl_navbar}>
        <h1 >
            <a href={`/${lang}/home`} className={h1Class}>DEVLOG</a>
        </h1>
        <ul>
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
            <button className={navbarStyles.dropdown_button} onClick={toggleDropdown}>
              <div>
                <span className={navbarStyles.hidden}>
                  {NAVBAR_LIST.language?.[lang as keyof Word]}
                  <span className={iconClass}>keyboard_arrow_down</span>
                </span>
                <p className={liClass}>
                  {NAVBAR_LIST.language?.[lang as keyof Word]}
                  <span className={iconClass}>keyboard_arrow_down</span>
                </p>
                <div className={isToggleActive ? dropDownActive : dropDownDefault}>
                  <LangLink params={{ key: `kr`, value: '한국어' }}></LangLink>
                  <LangLink params={{ key: `en`, value: 'English' }}></LangLink>
                </div>
              </div>
            </button>
          </li>
          <li>
            <button
              className={navbarStyles["toggle_button"]}
              onClick={handleButton}
              id="toggle_button"
            >
              <span className={lightMode}>
                <span className={iconClass}> wb_sunny </span>
              </span>
              <span className={darkMode}>
                <span className={iconClass}> dark_mode </span>
              </span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
