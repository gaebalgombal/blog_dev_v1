import { MDXRemote } from "next-mdx-remote/rsc";
import sidebarStyles from "@/styles/sidebar.module.css";
import contentStyles from "@/styles/content.module.css";
import { AnchorLink } from "@/lib/link";
import Cookies from "js-cookie";

const tableComponents = {
    h1: (props: any) => (
        <li className={sidebarStyles.h1}>
            <AnchorLink
                {...props}
                href={{ pathname: props.children }}
            ></AnchorLink>
        </li>
    ),
    h2: (props: any) => (
        <li className={sidebarStyles.h2}>
            <AnchorLink
                {...props}
                href={{ pathname: props.children }}
            ></AnchorLink>
        </li>
    ),
    h3: (props: any) => (
        <li className={sidebarStyles.h3}>
            <AnchorLink
                {...props}
                href={{ pathname: props.children }}
            ></AnchorLink>
        </li>
    ),
    p: (props: any) => <p hidden></p>,
    span: (props: any) => <span hidden></span>,
    div: (props: any) => <div hidden></div>,
    pre: (props: any) => <pre hidden></pre>,
    code: (props: any) => <code hidden></code>,
};

const contentComponent = {
    pre: (props: any) => {
        return <pre className={contentStyles.dark_code_box} {...props}></pre>;
    },
};

const TableMDX = (props: any) => {
    return (
        <MDXRemote
            {...props}
            components={{ ...tableComponents, ...(props.components || {}) }}
        />
    );
};

const ContentMDX = (props: any) => {
    const mode = Cookies.get("mode");

    return (
        <MDXRemote
            {...props}
            components={{ ...contentComponent, ...(props.components || {}) }}
        />
    );
};

export { TableMDX, ContentMDX };
