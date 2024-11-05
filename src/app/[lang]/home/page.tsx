import Template from "@/app/template";
import { HomeEN, HomeKR } from "@/components/template/home";

type Props = {
  params: {
    lang: string;
  };
};

const Home = async ({ params: { lang } }: Props) => {
  const params = { lang };

  return (
    <Template params={params}>
      {lang === "en" ? <HomeEN params={params} /> : <HomeKR params={params} />}
    </Template>
  );
};

export default Home;
