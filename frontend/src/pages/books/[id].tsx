import {useRouter} from 'next/router';
import {useEffect, useState} from "react";
import {searchBookById} from "@/api/books";
import {BookFullResponse} from "@/types/books_full_info";

const BookDetailPage = () => {
    const router = useRouter();
    const {id} = router.query;
    const [book, setBook] = useState<BookFullResponse>();

    useEffect(() => {
        if (!id) return;

        const searchId: string = (typeof id === 'string') ? id : id[0];
        searchBookById(searchId)
            .then((response: BookFullResponse) => {
                if (response) {
                    setBook(response);
                }
            })
            .catch(error => {
                console.error(`Failed to fetch book with id '${id}':`, error);
                // TODO: Handle the error in the UI (show the error in a notification)
            });
    }, [id]);

    return (
        <div className="min-h-screen bg-stone-100 p-6">
            <div className="mx-auto max-w-5xl">
                <div className="flex flex-col md:flex-row">
                    {/* Left side with Image */}
                    <div className="p-4 md:w-1/3">
                        <img src={book?.image} alt={book?.title}
                             className="rounded shadow-md"/>
                    </div>

                    {/* Right side with Details */}
                    <div className="p-4 md:w-2/3">
                        <h1 className="mb-2 text-3xl font-bold text-cyan-700">{book?.title}</h1>
                        {book?.subtitle &&
                            <h2 className="mb-4 text-xl text-stone-600">{book?.subtitle}</h2>}
                        <p className="mb-4 text-stone-600">
                            <strong>Authors:</strong> {book?.authors.join(", ")}</p>
                        <p className="mb-4 text-stone-600"><strong>Publisher:</strong> {book?.publisher}</p>
                        <p className="mb-4 text-stone-600"><strong>Published
                            Year:</strong> {book?.publishedYear}</p>
                        <p className="mb-4 text-stone-600"><strong>Page Count:</strong> {book?.pageCount}
                        </p>
                        <p className="text-stone-600"><strong>Description:</strong></p>
                        <p className="mb-4 text-stone-600">{book?.description}</p>

                        {/*ISBNs*/}
                        {book?.ISBNs?.map((ISBN, index) => {
                            return <p key={`isbn_${index}`} className="mb-4 text-stone-600">
                                <strong>ISBN {index + 1}: </strong>
                                <span>{ISBN}</span>
                            </p>

                        })}
                        <p className="mb-4 text-stone-600">
                            <strong>Categories:</strong> {book?.categories?.join(", ")}</p>
                        <p className="mb-4 text-stone-600"><strong>Rating:</strong> {book?.averageRating}
                        </p>

                        <div className="mt-8 space-x-4">
                            {book?.previewLink &&
                                <a href={book?.previewLink} target="_blank" rel="noopener norefferer"
                                   className="rounded-full bg-cyan-600 px-4 py-2 text-stone-100">Preview</a>}
                            {book?.infoLink &&
                                <a href={book?.infoLink} target="_blank" rel="noopener norefferer"
                                   className="rounded-full bg-cyan-600 px-4 py-2 text-stone-100">Info</a>}
                            {book?.buyLink &&
                                <a href={book?.buyLink} target="_blank" rel="noopener norefferer"
                                   className="rounded-full bg-cyan-600 px-4 py-2 text-stone-100">Buy</a>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetailPage;
