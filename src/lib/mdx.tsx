import { MDXRemote } from "next-mdx-remote/rsc";
import sidebarStyles from "@/styles/sidebar.module.css";
import { AnchorLink } from "@/lib/link";

const tableComponents = {
  h1: (props: any) => (
    <li className={sidebarStyles.h1}>
      <AnchorLink {...props} href={{ pathname: props.children }}>
        {" "}
      </AnchorLink>
    </li>
  ),
  h2: (props: any) => (
    <li className={sidebarStyles.h2}>
      <AnchorLink {...props} href={{ pathname: props.children }}></AnchorLink>
    </li>
  ),
  h3: (props: any) => (
    <li className={sidebarStyles.h3}>
      <AnchorLink {...props} href={{ pathname: props.children }}></AnchorLink>
    </li>
  ),
  p: (props: any) => <p hidden></p>,
};

const TableMDX = (props: any) => {
  return (
    <MDXRemote
      {...props}
      components={{ ...tableComponents, ...(props.components || {}) }}
    />
  );
};

export { TableMDX };
