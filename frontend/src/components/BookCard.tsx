import React from 'react';
import {GoogleBookLiteResponse} from "@/types/books_preview";
import {useRouter} from "next/router";

const BookCard: React.FC<GoogleBookLiteResponse> = ({id, volumeInfo}) => {
    const {title, authors, publishedDate, imageLinks, categories} = volumeInfo;

    const router = useRouter();
    const redirectToBookDetails = (): void => {
        if (!id) {
            console.error("No value for id found.");
            return;
        }
        const _ = router.push(`/books/${id}`);
    }

    const shortenTitle = (): string | undefined => {
        return title.length < 48 ? title : title.substring(0, 48) + "...";
    }

    const getPublicationYear = (): string | undefined => {
        if (!publishedDate) return publishedDate;

        return new Date(publishedDate).getFullYear().toString()
    }

    return (
        <div className="m-2 flex flex-col justify-between rounded-2xl border bg-stone-50 p-4 shadow-md text-al">
            <div className="mx-auto">
                <img src={imageLinks?.thumbnail} alt={title} className="mb-4 h-52 w-auto rounded-md object-cover"/>
            </div>
            <div className="flex h-48 flex-col justify-between">
                <h2 className="text-center text-lg font-bold leading-tight text-cyan-700">{shortenTitle()}</h2>
                <div className="px-2">
                    {authors && authors[0] && <p className="text-stone-600"><strong>Author:</strong> {authors[0]}</p>}
                    {publishedDate && <p className="text-stone-600"><strong>Year:</strong> {getPublicationYear()}</p>}
                    {categories && categories[0] &&
                        <p className="text-stone-600"><strong>Category:</strong> {categories[0].split(' & ')[0]}</p>}
                </div>
                <button className="rounded-full bg-cyan-600 p-2 text-stone-50" onClick={redirectToBookDetails}>View Details</button>
            </div>
        </div>
    );
};

export default BookCard;
