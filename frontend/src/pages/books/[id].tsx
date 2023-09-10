import {useRouter} from 'next/router';
import {useEffect, useState} from "react";
import {searchBookById} from "@/api/books";
import {GoogleBookFullResponse} from "@/types/books_full_info";

const BookDetailPage = () => {
    const router = useRouter();
    const {id} = router.query;
    const [book, setBook] = useState<GoogleBookFullResponse>();

    useEffect(() => {
        if (!id) return;

        const searchId: string = (typeof id === 'string') ? id : id[0];
        searchBookById(searchId)
            .then((response: GoogleBookFullResponse) => {
                if (response) {
                    setBook(response);
                }
            })
            .catch(error => {
                console.error(`Failed to fetch book with id '${id}':`, error);
                // TODO: Handle the error in the UI (show the error in a notification)
            });
    }, [id]);

    const getPublicationYear = (publishedDate: string | undefined): string | undefined => {
        if (!publishedDate) return publishedDate;

        return new Date(publishedDate).getFullYear().toString()
    }

    return (
        <div className="min-h-screen bg-stone-100 p-6">
            <div className="mx-auto max-w-5xl">
                <div className="flex flex-col md:flex-row">
                    {/* Left side with Image */}
                    <div className="p-4 md:w-1/3">
                        <img src={book?.volumeInfo?.imageLinks?.medium} alt={book?.volumeInfo?.title}
                             className="rounded shadow-md"/>
                    </div>

                    {/* Right side with Details */}
                    <div className="p-4 md:w-2/3">
                        <h1 className="mb-2 text-3xl text-cyan-700 font-bold">{book?.volumeInfo?.title}</h1>
                        {book?.volumeInfo?.subtitle &&
                            <h2 className="mb-4 text-xl text-stone-600">{book?.volumeInfo?.subtitle}</h2>}
                        <p className="mb-4 text-stone-600">
                            <strong>Authors:</strong> {book?.volumeInfo?.authors.join(", ")}</p>
                        <p className="mb-4 text-stone-600"><strong>Publisher:</strong> {book?.volumeInfo?.publisher}</p>
                        <p className="mb-4 text-stone-600"><strong>Published
                            Year:</strong> {getPublicationYear(book?.volumeInfo?.publishedDate)}</p>
                        <p className="mb-4 text-stone-600"><strong>Page Count:</strong> {book?.volumeInfo?.pageCount}
                        </p>
                        <p className="text-stone-600"><strong>Description:</strong></p>
                        <p className="mb-4 text-stone-600">{book?.volumeInfo?.description}</p>
                        <p className="mb-4 text-stone-600">
                            <strong>ISBN:</strong> {book?.volumeInfo?.industryIdentifiers && book?.volumeInfo?.industryIdentifiers[0]?.identifier}
                        </p>

                        <p className="mb-4 text-stone-600">
                            <strong>Categories:</strong> {book?.volumeInfo?.categories?.join(", ")}</p>
                        <p className="mb-4 text-stone-600"><strong>Rating:</strong> {book?.volumeInfo?.averageRating}
                        </p>

                        <div className="mt-8 space-x-4">
                            {book?.volumeInfo?.previewLink &&
                                <a href={book?.volumeInfo?.previewLink} target="_blank" rel="noopener norefferer"
                                   className="rounded-full bg-cyan-600 px-4 py-2 text-stone-100">Preview</a>}
                            {book?.volumeInfo?.infoLink &&
                                <a href={book?.volumeInfo?.infoLink} target="_blank" rel="noopener norefferer"
                                   className="rounded-full bg-cyan-600 px-4 py-2 text-stone-100">Info</a>}
                            {book?.saleInfo?.buyLink &&
                                <a href={book?.saleInfo?.buyLink} target="_blank" rel="noopener norefferer"
                                   className="rounded-full bg-cyan-600 px-4 py-2 text-stone-100">Buy</a>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetailPage;
