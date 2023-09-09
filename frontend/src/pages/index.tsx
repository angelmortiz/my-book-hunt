import type {NextPage} from 'next';
import SearchBar from '../components/SearchBar';
import Head from 'next/head';
import Image from 'next/image'

const Home: NextPage = () => {
    const handleSearch = (query: string) => {
        console.log('Searching for:', query);
        // TODO:API call here later
    };

    return (
        <>
            <Head>
                <title>My Book Hunt</title>
            </Head>
            <div className="min-h-screen bg-stone-100 text-stone-600">
                <div className="container mx-auto flex flex-col gap-2 px-4 py-10">
                    <div className="mx-auto flex items-center gap-5">
                        <Image src="/mbh_logo_50px.png" width="0" height="0" sizes="100vw"
                               className="h-[50px] w-[50px]" alt="My Book Hunt logo"/>
                        <h1 className="my-6 text-center text-3xl">My Book Hunt</h1>
                    </div>
                    <SearchBar onSearch={handleSearch}/>
                    {/* TODO: Search results here  */}
                </div>

            </div>
        </>
    );
};

export default Home;
