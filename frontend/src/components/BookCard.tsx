import React from 'react';
import {GoogleBookLiteResponse} from "@/types/books";

const BookCard: React.FC<GoogleBookLiteResponse> = ({id, selfLink, volumeInfo}) => {
    let {title, authors, publishedDate, imageLinks, categories} = volumeInfo;

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
                <h2 className="text-center text-lg font-bold text-cyan-700 leading-tight">{shortenTitle()}</h2>
                <div className="px-2">
                    {authors && authors[0] && <p className="text-stone-600"><b>Author:</b> {authors[0]}</p>}
                    {publishedDate && <p className="text-stone-600"><b>Year:</b> {getPublicationYear()}</p>}
                    {categories && categories[0] && <p className="text-stone-600"><b>Category:</b> {categories[0].split(' & ')[0]}</p>}
                </div>
                <button className="rounded-full bg-cyan-600 p-2 text-stone-50">View Details</button>
            </div>
        </div>
    );
};

export default BookCard;
