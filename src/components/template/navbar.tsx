"use client";

import { useState } from "react";

import classNames from "classnames";

import layoutStyles from "@/styles/layout.module.css";
import navbarStyles from "@/styles/navbar.module.css";

import { NavLink } from "@/lib/link";
import { NAVBAR_LIST } from "@/config/const";
import { PostProps, Word } from "@/config/types";

export const Navbar = ({ params: { lang } }: PostProps) => {
  const [isToggleActive, setToggleActive] = useState(false);

  const toggleDropdown = (event: any) => {
    setToggleActive((prev) => !prev);
    event.preventDefault();

    return isToggleActive;
  };

  const dropDownActive = classNames({
    [navbarStyles["dropdown"]]: true,
    [navbarStyles["active"]]: true,
  });

  const dropDownDefault = classNames({
    [navbarStyles["dropdown"]]: true,
    [navbarStyles["default"]]: true,
  });

  const iconClass = classNames({
    "material-icons": true,
    [navbarStyles.icons]: true,
  });

  return (
    <nav className={layoutStyles.ly_navbar}>
      <div className={navbarStyles.bl_navbar}>
        <h1>DEVLOG</h1>
        <ul>
          <li>
            <NavLink href={{ pathname: `/${lang}/home` }}>
              {NAVBAR_LIST.home?.[lang as keyof Word]}
            </NavLink>
          </li>
          <li>
            <NavLink href={{ pathname: `/${lang}/resume` }}>
              {NAVBAR_LIST.resume?.[lang as keyof Word]}
            </NavLink>
          </li>
          <li>
            <NavLink href={{ pathname: `/${lang}/portfolio` }}>
              {NAVBAR_LIST.portfolio?.[lang as keyof Word]}
            </NavLink>
          </li>
          <li>
            <a href="">
              <p>{NAVBAR_LIST.posts?.[lang as keyof Word]}</p>
            </a>
          </li>
          <li>
            <a href="" onClick={toggleDropdown}>
              <p>
                {NAVBAR_LIST.language?.[lang as keyof Word]}{" "}
                <span className={iconClass}> keyboard_arrow_down </span>
              </p>
            </a>
            <div className={isToggleActive ? dropDownActive : dropDownDefault}>
              {/* TODO: 현재 url의 영어/한국어로 가기 */}
              <NavLink href={{ pathname: `/kr/home` }}>한국어</NavLink>
              <NavLink href={{ pathname: `/en/home` }}>English</NavLink>
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
