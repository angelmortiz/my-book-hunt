import type {NextPage} from 'next';
import Head from 'next/head';
import {useEffect, useState} from "react";
import SearchBar from '../components/SearchBar';
import Grid from "@/components/Grid";
import {searchBooks} from "@/api/books";
import {BookPreviewResponse, BookPreviewFullResponse} from "@/types/books_preview";
import Pagination from "@/components/pagination";
import Spinner from "@/components/Spinner";
import {useRouter} from "next/router";


const Home: NextPage = () => {
    const router = useRouter();
    const [books, setBooks] = useState<BookPreviewResponse[]>([]);
    const [totalBooks, setTotalBooks] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(Number(router?.query?.page || 1));
    const [currentQuery, setCurrentQuery] = useState<string>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const pageSize = 20;

    // Allows page to automatically adjust back to previous status before the user navigated to another page.
    // Example: Sets url to previous search parameters and page #. Also sets the value in the bar search
    useEffect(() => {
        if (!router.isReady || !router.query.search) return;

        setCurrentQuery(router.query.search as string);
        const page = Number(router?.query?.page || 1);
        setCurrentPage(page);
        const searchVal= router.query.search as string;
        handleSearch(searchVal);
    }, [router.isReady]);


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

        const _ = router.push({
            pathname: '/',
            query: {search: query, page: currentPage}
        }, undefined, {shallow: true});
    };

    useEffect(() => {
        if (!currentQuery) return;
        handleSearch(currentQuery);
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
                <div className="container mx-auto flex flex-col gap-2 px-4 py-6 sm:py-8 md:py-10">
                    <div className="mx-auto my-2 flex flex-col items-center gap-2 sm:my-4 sm:flex-row sm:gap-5 md:my-6">
                        <img src="/mbh_logo_medium.png"
                             className="h-[50px] w-[50px]" alt="My Book Hunt logo"/>
                        <h1 className="text-center text-3xl sm:text-4xl font-extrabold tracking-wider uppercase
                                       bg-clip-text text-transparent bg-gradient-to-r from-cyan-700
                                       to-stone-600 border-b">
                            My Book Hunt
                        </h1>
                    </div>
                    <div className="flex flex-col text-cyan-950">
                        <SearchBar onSearch={handleSearch} query={currentQuery}/>
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
