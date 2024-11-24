import layoutStyles from "@/styles/layout.module.css";
import notfoundStyles from "@/styles/notfound.module.css";
import typoStyles from "@/styles/typography.module.css";
import classNames from "classnames";

export async function generateStaticParams() {
    // Fetch or define the data for your dynamic paths
    const pages = [{ lang: "en" }, { lang: "kr" }];

    // Map over the data to create static params
    return pages.map((page) => ({
        lang: page.lang,
    }));
}

export default function NotFound() {
    const previous = classNames({
        [notfoundStyles.previous]: true,
        [typoStyles.en_slogan_tiny]: true,
        // [typoStyles.signature_en]: true,
    });

    const home = classNames({
        [notfoundStyles.home]: true,
        [typoStyles.en_slogan_tiny]: true,
        // [typoStyles.signature_en]: true,
    });

    return (
        <div className={layoutStyles.ly_404}>
            <div className={notfoundStyles.bl_404}>
                <h1 className={typoStyles.en_slogan_giant}>
                    {"404 - Page Not Found"}
                </h1>
                <a href="javascript:history.back()" className={previous}>
                    BACK TO PREVIOUS PAGE ＞
                </a>
                <a href="/en/home" className={home}>
                    BACK HOME ＞
                </a>
            </div>
        </div>
    );
}
