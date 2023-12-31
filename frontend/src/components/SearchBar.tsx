import React, {useEffect, useState} from 'react';
import {HiMagnifyingGlass} from 'react-icons/hi2'

type SearchBarProps = {
    onSearch: (query: string) => void,
    query: string | undefined
}

const SearchBar: React.FC<SearchBarProps> = ({onSearch, query}) => {
    const [searchTerm, setSearchTerm] = useState(query || "");

    useEffect(() => {
        setSearchTerm(query || "");
    }, [query]);

    // Handle 'Enter' press on the keyboard after typing
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            onSearch(searchTerm);
        }
    }

    return (
        <div className="flex items-center justify-center p-4">
            <input
                className="mr-2 w-full rounded-full border-2 border-cyan-600 px-4 py-2"

                type="text"
                placeholder="Search by titles, authors, ISBNs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
            />
            <button className="rounded-full bg-cyan-600 px-3 py-3 text-stone-100 hover:bg-stone-600"
                    onClick={() => onSearch(searchTerm)}>
                <HiMagnifyingGlass/>
            </button>
        </div>
    );
};

export default SearchBar;
