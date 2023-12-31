import type {GetServerSideProps} from 'next'
import {useRouter} from 'next/router';
import React, {useState} from "react";
import {searchBookById} from "@/api/books";
import {BookFullResponse} from "@/types/books_full_info";
import Spinner from "@/components/Spinner";
import {HiArrowLongLeft, HiOutlineStar} from "react-icons/hi2";

type PageDetailProps = {
    book: BookFullResponse;
}

const BookDetailPage: React.FC<PageDetailProps> = ({book}) => {
    const router = useRouter();
    const {id} = router.query;
    const [isLoading, setIsLoading] = useState<boolean>(false);

    if (!book) {
        return <Spinner/>;
    }

    return (
        <div className="min-h-screen bg-stone-100 p-6 sm:p-8">

            <div className="mx-auto max-w-5xl rounded-lg bg-stone-50 shadow-md sm:p-6 lg:p-8">
                <button onClick={() => router.back()} className="p-2">
                    <strong className="flex items-center text-xl text-cyan-700">
                        <HiArrowLongLeft className="mr-1 h-5 w-5 font-bold" aria-hidden="true"/>
                        Back
                    </strong>
                </button>

                <div className="flex flex-col md:flex-row">
                    {/* Left side with Image */}
                    <div className="p-4 md:w-1/3">
                        <img src={book?.image} alt={book?.title}
                             className="mx-auto h-auto w-fit rounded shadow-md min-h-[300px] min-w-[200px]
                                         transition-transform duration-300 text-al hover:scale-105"/>
                    </div>

                    {/* Right side with Details */}
                    <div className="p-4 md:w-2/3">

                        <h1 className="mb-2 text-3xl font-bold text-cyan-700">{book?.title}</h1>
                        {book?.subtitle &&
                            <h2 className="mb-4 text-xl text-stone-600">{book?.subtitle}</h2>}

                        {/* Buttons */}
                        <div className="my-6 space-x-4">
                            {book?.previewLink &&
                                <a href={book?.previewLink} target="_blank" rel="noopener norefferer"
                                   className="rounded-full bg-cyan-600 px-4 py-2 text-stone-100">Preview</a>}
                            {book?.infoLink &&
                                <a href={book?.infoLink} target="_blank" rel="noopener norefferer"
                                   className="rounded-full bg-cyan-700 px-4 py-2 text-stone-100">Info</a>}
                            {book?.buyLink &&
                                <a href={book?.buyLink} target="_blank" rel="noopener norefferer"
                                   className="rounded-full bg-cyan-800 px-4 py-2 text-stone-100">Buy</a>}
                        </div>

                        {book?.authors && book.authors.length > 0 &&
                            <p className="mt-4 mb-2 text-stone-600">
                                <strong>Authors:</strong> {book?.authors?.join(", ")}</p>}
                        {book?.publisher &&
                            <p className="mb-2 text-stone-600"><strong>Publisher:</strong> {book?.publisher}</p>}
                        {book?.publishedYear &&
                            <p className="mb-2 text-stone-600"><strong>Published
                                Year:</strong> {book?.publishedYear}</p>}
                        {book?.pageCount &&
                            <p className="mb-2 text-stone-600"><strong>Page Count:</strong> {book?.pageCount}
                            </p>}
                        {book?.averageRating &&
                            <div className="flex gap-2 items-center text-stone-600 mb-4">
                                <p className="text-stone-600">
                                    <strong>Rating:</strong> {Math.ceil(book?.averageRating)}

                                </p>
                                <div className="flex text-lg">
                                    {Array.from({length: Math.ceil(book?.averageRating || 0)}).map((_, index) => (
                                        <HiOutlineStar className="text-cyan-700" key={index}/>
                                    ))}
                                </div>
                            </div>
                        }
                        {book?.description &&
                            <p className="text-stone-600"><strong>Description:</strong></p>}
                        {book?.description &&
                            <p className="mb-4 text-stone-600">{book?.description}</p>
                        }

                        {/*ISBNs*/}
                        {book?.ISBNs?.map((ISBN, index) => {
                            return <p key={`isbn_${index}`} className="mb-2 text-stone-600">
                                <strong>ISBN {index + 1}: </strong>
                                <span>{ISBN}</span>
                            </p>

                        })}
                        {book?.categories &&
                            <p className="mt-4 mb-4 text-stone-600">
                                <strong>Categories:</strong> {book?.categories?.join(", ")}</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetailPage;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const id: string = context.params.id;

    try {
        const book: BookFullResponse = await searchBookById(id);
        return {props: {book}};
    } catch (error) {
        console.error(`Failed to fetch book with id '${id}':`, error);
        return {props: {book: null}};
    }
}