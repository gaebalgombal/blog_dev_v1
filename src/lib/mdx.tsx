import { MDXRemote } from "next-mdx-remote/rsc";
import sidebarStyles from "@/styles/sidebar.module.css";

const components = {
  h1: (props: any) => (
    <li {...props} className={sidebarStyles.h1}>
      {props.children}
    </li>
  ),
  h2: (props: any) => (
    <li {...props} className={sidebarStyles.h2}>
      <a href="">{props.children}</a>
    </li>
  ),
  h3: (props: any) => (
    <li {...props} className={sidebarStyles.h3}>
      <a href="">{props.children}</a>
    </li>
  ),
  p: (props: any) => (
    <p {...props} hidden>
      {props.children}
    </p>
  ),
};

const TableMDX = (props: any) => {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
};

export { TableMDX };
