import classNames from "classnames";

import layoutStyles from "@/styles/layout.module.css";
import navbarStyles from "@/styles/navbar.module.css";

import { ConditionalLink } from "@/lib/link";

type Props = {
  params: { lang: string };
};

export const Navbar = async ({ params: { lang } }: Props) => {
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
              {/* <p className={navbarStyles.active}> 홈</p> */}홈
            </ConditionalLink>
          </li>
          <li>
            <ConditionalLink href={{ pathname: `/${lang}/resume` }}>
              이력서
            </ConditionalLink>
          </li>
          <li>
            <ConditionalLink href={{ pathname: `/${lang}/portfolio` }}>
              포트폴리오
            </ConditionalLink>
          </li>
          <li>
            <ConditionalLink href={{ pathname: `/${lang}/posts` }}>
              블로그
            </ConditionalLink>
          </li>
          <li>
            <a href="">
              <p>
                언어
                <span className={iconClass}> keyboard_arrow_down </span>
              </p>
            </a>
            <div className={navbarStyles.dropdown}>
              <ConditionalLink href={{ pathname: `/${lang}` }}>
                한국어
              </ConditionalLink>
              <ConditionalLink href={{ pathname: `/${lang}` }}>
                영어
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
