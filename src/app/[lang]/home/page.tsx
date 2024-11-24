import { HomeEN, HomeKR } from "@/components/template/home";
import { Navbar } from "@/components/template/navbar";

type Props = {
    params: {
        lang: string;
    };
};

export async function generateStaticParams() {
    // Fetch or define the data for your dynamic paths
    const pages = [{ lang: "en" }, { lang: "kr" }];

    // Map over the data to create static params
    return pages.map((page) => ({
        lang: page.lang,
    }));
}

const Home = async ({ params: { lang } }: Props) => {
    const params = { lang };

    return (
        <div>
            <Navbar params={{ lang }} />
            {lang === "en" ? (
                <HomeEN params={params} />
            ) : (
                <HomeKR params={params} />
            )}
        </div>
    );
};

export default Home;
