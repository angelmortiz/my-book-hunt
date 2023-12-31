import React from 'react';
import BookCard from './BookCard';
import {BookPreviewResponse} from "@/types/books_preview";

type GridProps = {
    books: BookPreviewResponse[];
}

const Grid: React.FC<GridProps> = ({books}) => {
    return (
        <div
            className="mt-2 grid grid-cols-1 gap-4 sm:mt-4 sm:grid-cols-2 md: md:mt-6 lg:mt-8 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {books?.map((book, index) => (
                <BookCard key={index} book={book} />
            ))}
        </div>
    );
};

export default Grid;
