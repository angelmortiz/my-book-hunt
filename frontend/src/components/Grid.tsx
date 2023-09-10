import React from 'react';
import BookCard from './BookCard';
import {GoogleBookLiteResponse} from "@/types/books";

interface GridProps {
    books: GoogleBookLiteResponse[];
}

const Grid: React.FC<GridProps> = ({ books }) => {
    return (
        <div className="mt-2 grid grid-cols-1 gap-4 sm:mt-4 sm:grid-cols-2 md: md:mt-6 md:grid-cols-3 lg:mt-8 lg:grid-cols-4 xl:grid-cols-5">
            {books?.map((book, index) => (
                <BookCard key={index} {...book} />
            ))}
        </div>
    );
};

export default Grid;
