import type { Metadata } from "next";

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
                <footer>This is FOOTER.</footer>
            </body>
        </html>
    );
}
