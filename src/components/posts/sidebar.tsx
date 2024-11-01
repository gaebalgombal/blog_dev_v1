import classNames from "classnames";

import layoutStyles from "@/styles/layout.module.css";
import sidebarStyles from "@/styles/sidebar.module.css";

import { ConditionalLink, ButtonLink } from "@/lib/link";

type Props = { params: { lang: string } };

export const Sidebar = async ({ params: { lang } }: Props) => {
  return (
    <div className={layoutStyles.ly_sidebar}>
      <div className={sidebarStyles.bl_sidebar}>
        <p>On this site ···</p>
        <div className={sidebarStyles.ly_table}>
          <h1>
            HOW I SET UP
            <br />
            MY OWN BLOG ?
          </h1>
          <ul>
            <li className={sidebarStyles.h1}>
              <a href="#How-to-code">PROJECTS</a>
            </li>
            <li className={sidebarStyles.h2}>
              <a href="#first-rule">This is sample page(1)</a>
            </li>
            <li className={sidebarStyles.h2}>
              <a href="#second-rule">This is sample page(2)</a>
            </li>
            <li className={sidebarStyles.h1}>
              <a href="#How-to-write">RETROSPECTS</a>
            </li>
            <li className={sidebarStyles.h2}>
              <a href="#why-do-you-write">This is sample page(3)</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
