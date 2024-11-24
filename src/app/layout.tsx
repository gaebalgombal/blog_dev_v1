import type { Metadata } from "next";
import layoutStyles from "@/styles/layout.module.css";

import "../styles/globals.css";

export const metadata: Metadata = {
    title: "Devlo9",
    description: "Hello World! This is Devlo9.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <head>
                <link
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet"
                />
            </head>
            <body>
                <main>{children}</main>
                <footer>
                    <div className={layoutStyles.ly_footer}>
                        ⓒ DEVLOG, KIM JEONG YEON
                    </div>
                </footer>
            </body>
        </html>
    );
}
