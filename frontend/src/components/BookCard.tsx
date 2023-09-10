import React from 'react';
import {GoogleBookLiteResponse} from "@/types/books";

const BookCard: React.FC<GoogleBookLiteResponse> = ({id, selfLink, volumeInfo }) => {
    const {title, authors, publishedDate, imageLinks} = volumeInfo;
    const getYear = (): string | undefined  => {
        if (!publishedDate) return publishedDate;

        return new Date(publishedDate).getFullYear().toString()
    }

    return (
        <div className="m-2 flex flex-col gap-1 rounded-md border bg-stone-50 p-4 shadow-md">
            <div className="mx-auto">
                <img src={imageLinks?.thumbnail} alt={title} className="mb-4 h-52 w-auto rounded-md object-cover" />
            </div>
            <h2 className="text-lg font-semibold text-cyan-700">{title}</h2>
            <p className="text-stone-600">{authors[0]}</p>
            <p className="text-stone-600">Publication year: {getYear()}</p>
        </div>
    );
};

export default BookCard;
