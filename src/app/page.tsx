import { redirect } from 'next/navigation'


const Home = ({ params: { } }) => {
    redirect('/en/home');
    return (<div></div>);
}

export default Home