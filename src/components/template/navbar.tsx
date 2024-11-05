import classNames from "classnames";

import layoutStyles from "@/styles/layout.module.css";
import navbarStyles from "@/styles/navbar.module.css";

import { ConditionalLink } from "@/lib/link";
import { NAVBAR_LIST } from "@/config/const";
import { PostProps, Name } from "@/config/types";

export const Navbar = async ({ params: { lang } }: PostProps) => {
  const wrapperClass = classNames({
    [navbarStyles["icons-wrapper"]]: true,
    [navbarStyles["active"]]: true,
  });

  const wrapperDarkClass = classNames({
    [navbarStyles["icons-wrapper"]]: true,
    [navbarStyles["dark-mode"]]: true,
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
            <ConditionalLink href={{ pathname: `/${lang}/home` }}>
              {NAVBAR_LIST.home?.[lang as keyof Name]}
            </ConditionalLink>
          </li>
          <li>
            <ConditionalLink href={{ pathname: `/${lang}/resume` }}>
              {NAVBAR_LIST.resume?.[lang as keyof Name]}
            </ConditionalLink>
          </li>
          <li>
            <ConditionalLink href={{ pathname: `/${lang}/portfolio` }}>
              {NAVBAR_LIST.portfolio?.[lang as keyof Name]}
            </ConditionalLink>
          </li>
          <li>
            <ConditionalLink href={{ pathname: `/${lang}/posts` }}>
              {NAVBAR_LIST.posts?.[lang as keyof Name]}
            </ConditionalLink>
          </li>
          <li>
            s
            <a href="">
              <p>
                {NAVBAR_LIST.language?.[lang as keyof Name]}
                <span className={iconClass}> keyboard_arrow_down </span>
              </p>
            </a>
            <div className={navbarStyles.dropdown}>
              <ConditionalLink href={{ pathname: `/${lang}` }}>
                한국어
              </ConditionalLink>
              <ConditionalLink href={{ pathname: `/${lang}` }}>
                English
              </ConditionalLink>
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
