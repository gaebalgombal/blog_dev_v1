import { Navbar } from "@/components/template/navbar";
import { CommingSoonEN, CommingSoonKR } from "@/components/template/comming";

type Props = {
  params: {
    lang: string;
  };
};

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
