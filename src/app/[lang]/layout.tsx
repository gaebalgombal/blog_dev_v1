export const metadata = {
    title: "DEVLOG",
    description: "EVERYTHING I LEARNED ABOUT DEVELOPMENT",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div>{children}</div>;
}
