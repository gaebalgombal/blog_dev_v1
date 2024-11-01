import classNames from "classnames";

import layoutStyles from "@/styles/layout.module.css";
import navbarStyles from "@/styles/navbar.module.css";

export const Navbar = async ({}) => {
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
            <a href="#home" className={navbarStyles.active}>
              홈
            </a>
          </li>
          <li>
            <a href="#services">이력서</a>
          </li>
          <li>
            <a href="#about">포트폴리오</a>
          </li>
          <li>
            <a href="#contact">블로그</a>
          </li>
          <li>
            <a href="#languages">
              언어
              <span className={iconClass}> keyboard_arrow_down </span>
            </a>
            <div className={navbarStyles.dropdown}>
              <a href="#">한국어</a>
              <a href="#">영어</a>
            </div>
          </li>
          <li>
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
          </li>
        </ul>
      </div>
    </nav>
  );
};
