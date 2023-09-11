import type {NextPage} from 'next';
import Head from 'next/head';
import {useEffect, useState} from "react";
import SearchBar from '../components/SearchBar';
import Grid from "@/components/Grid";
import {searchBooks} from "@/api/books";
import {BookPreviewResponse, BookPreviewFullResponse} from "@/types/books_preview";
import Pagination from "@/components/pagination";
import Spinner from "@/components/Spinner";


const Home: NextPage = () => {
    const [books, setBooks] = useState<BookPreviewResponse[]>([]);
    const [totalBooks, setTotalBooks] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentQuery, setCurrentQuery] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const pageSize = 20;

    const handleSearch = (query: string): void => {
        // Reset values if query is empty
        if (!query) {
            setCurrentQuery(undefined);
            setBooks([]);
            setTotalBooks(0);
            return;
        }

        setIsLoading(true);
        const startIndex = (currentPage - 1) * pageSize;
        setCurrentQuery(query);
        searchBooks(query, startIndex)
            .then((response: BookPreviewFullResponse) => {
                if (response) {
                    console.log(response.totalItems);
                    setTotalBooks(response.totalItems || 0);
                    setTotalPages(Math.ceil((response.totalItems || 0) / pageSize));
                    setBooks(response.items);
                }
            })
            .catch(error => {
                console.error('Failed to fetch books:', error);
                // TODO: Handle the error in the UI (show the error in a notification)
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        handleSearch(currentQuery || '');
    }, [currentPage]);

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    return (
        <>
            <Head>
                <title>My Book Hunt</title>
            </Head>
            <div className="min-h-screen bg-stone-100 text-stone-600">
                <div className="container mx-auto flex flex-col gap-2 px-4 py-10">
                    <div className="mx-auto flex items-center gap-5">
                        <img src="/mbh_logo_50px.png"
                               className="h-[50px] w-[50px]" alt="My Book Hunt logo"/>
                        <h1 className="my-6 text-center text-3xl">My Book Hunt</h1>
                    </div>
                    <div className="flex flex-col text-cyan-950">
                        <SearchBar onSearch={handleSearch}/>
                        {totalBooks > 0 && <p className="-mt-2 px-6 text-sm">Total books found: {totalBooks}</p>}
                    </div>

                    {isLoading ?
                        <Spinner/> :
                        <>
                            <Grid books={books}/>
                            <Pagination totalPages={totalPages} currentPage={currentPage}
                                        onNextPage={goToNextPage} onPreviousPage={goToPreviousPage}/>
                        </>
                    }

                </div>

            </div>
        </>
    );
};

export default Home;
