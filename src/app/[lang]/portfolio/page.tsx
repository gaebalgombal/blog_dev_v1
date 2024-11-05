import Template from "@/app/template";
import { CommingSoonEN, CommingSoonKR } from "@/components/template/comming";

type Props = {
  params: {
    lang: string;
  };
};

const Resume = async ({ params: { lang } }: Props) => {
  const params = { lang };

  return (
    <Template params={params}>
      {lang === "en" ? (
        <CommingSoonEN params={params} />
      ) : (
        <CommingSoonKR params={params} />
      )}
    </Template>
  );
};

export default Resume;
