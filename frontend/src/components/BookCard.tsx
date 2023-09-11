import React from 'react';
import {BookPreviewResponse} from "@/types/books_preview";
import {useRouter} from "next/router";
import Image from "next/image";

const alternativeImage = "https://vectorportal.com/storage/tLDDoIwxfUATlorcYCF77rN1Idn0cnGhQPU5uVcL.jpg";

type CardProps = {
    book: BookPreviewResponse;
}

const BookCard: React.FC<CardProps> = (bookInfo) => {
    const {book} = bookInfo;
    const router = useRouter();
    const redirectToBookDetails = (): void => {
        if (!book.id) {
            console.error("No value for id found.");
            return;
        }
        const _ = router.push(`/books/${book.id}`);
    }

    const shortenTitle = (): string | undefined => {
        return book?.title?.length < 48 ? book?.title : book?.title.substring(0, 48) + "...";
    }

    return (
        <div className="m-2 flex flex-col justify-between rounded-2xl border bg-stone-50 p-4 shadow-md text-al">
            <div className="mx-auto">
                <img src={book?.thumbnail || alternativeImage} alt={book?.title}
                     className="mb-4 h-52 w-auto rounded-md object-cover"/>
            </div>
            <div className="flex h-48 flex-col justify-between">
                <h2 className="text-center text-lg font-bold leading-tight text-cyan-700">{shortenTitle()}</h2>
                <div className="px-2">
                    {book?.authors && book?.authors[0] &&
                        <p className="text-stone-600"><strong>Author:</strong> {book?.authors}</p>}
                    {book?.publishedYear &&
                        <p className="text-stone-600"><strong>Year:</strong> {book?.publishedYear}</p>}
                    {book?.categories && book?.categories[0] &&
                        <p className="text-stone-600"><strong>Category:</strong> {book?.categories[0].split(' & ')[0]}
                        </p>}
                </div>
                <button className="rounded-full bg-cyan-600 p-2 text-stone-50" onClick={redirectToBookDetails}>View
                    Details
                </button>
            </div>
        </div>
    );
};

export default BookCard;
