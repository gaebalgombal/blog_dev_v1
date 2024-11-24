import { Navbar } from "@/components/template/navbar";
import { CommingSoonEN, CommingSoonKR } from "@/components/template/comming";

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

const Resume = async ({ params: { lang } }: Props) => {
    const params = { lang };

    return (
        <div>
            <Navbar params={{ lang }} />
            {lang === "en" ? (
                <CommingSoonEN params={params} />
            ) : (
                <CommingSoonKR params={params} />
            )}
        </div>
    );
};

export default Resume;
