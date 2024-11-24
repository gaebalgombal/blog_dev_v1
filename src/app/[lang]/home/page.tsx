import { HomeEN, HomeKR } from "@/components/template/home";
import { Navbar } from "@/components/template/navbar";

type Props = {
  params: {
    lang: string;
  };
};

const Home = async ({ params: { lang } }: Props) => {
  const params = { lang };  

  return (
    <div>
      <Navbar params={{ lang }} />
      {lang === "en" ? <HomeEN params={params} /> : <HomeKR params={params} />}
    </div>
  );
};

export default Home;
