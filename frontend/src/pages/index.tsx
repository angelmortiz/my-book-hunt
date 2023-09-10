import type {NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image'
import {useState} from "react";
import SearchBar from '../components/SearchBar';
import Grid from "@/components/Grid";
import {searchBooks} from "@/api/books";
import {GoogleBookLiteResponse, GoogleBooksLiteResponse} from "@/types/books_preview";

const Home: NextPage = () => {
    const [books, setBooks] = useState<GoogleBookLiteResponse[]>([]);
    const [totalBooks, setTotalBooks] = useState<number>();

    const handleSearch = (query: string): void => {
        // Reset values if query is empty
        if (!query) {
            setBooks([]);
            setTotalBooks(undefined);
            return;
        }

        searchBooks(query)
            .then((response: GoogleBooksLiteResponse) => {
                if (response) {
                    setTotalBooks(response.totalItems);
                    setBooks(response.items);
                }
            })
            .catch(error => {
                console.error('Failed to fetch books:', error);
                // TODO: Handle the error in the UI (show the error in a notification)
            });
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
                    <div className="flex flex-col text-cyan-950">
                        <SearchBar onSearch={handleSearch}/>
                        {totalBooks && <p className="px-6 -mt-2 text-sm">Total books found: {totalBooks}</p>}
                    </div>
                    {/*TODO: Add spinning gif while fetching books from backend.*/}
                    <Grid books={books}/>
                </div>

            </div>
        </>
    );
};

export default Home;
