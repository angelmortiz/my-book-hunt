import React from "react";
import {HiArrowLongLeft, HiArrowLongRight} from "react-icons/hi2";

type PaginationProps = {
    totalPages: number,
    currentPage: number,
    onNextPage: () => void,
    onPreviousPage: () => void,
}

const Pagination: React.FC<PaginationProps> = (props) => {
    const {
        totalPages, currentPage, onNextPage, onPreviousPage
    } = props;

    return (
        totalPages > 0 &&
        <nav className="mt-4 flex items-center justify-between border-t border-stone-200 px-4 sm:px-0">
            <div className="-mt-px flex w-0 flex-1">
                <button
                    className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-stone-500 hover:border-stone-300 hover:text-stone-700"
                    onClick={onPreviousPage} disabled={currentPage === 1}>
                    <HiArrowLongLeft className="mr-3 h-5 w-5 text-stone-400" aria-hidden="true"/>
                    Previous
                </button>
            </div>
            <p
                className="inline-flex items-center pt-4 pl-1 text-sm font-medium text-stone-500">
                Page {currentPage} of {totalPages}
            </p>
            <div className="-mt-px flex w-0 flex-1 justify-end">
                <button
                    className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-stone-500 hover:border-stone-300 hover:text-stone-700"
                    onClick={onNextPage}
                    disabled={currentPage === totalPages}>
                    Next
                    <HiArrowLongRight className="ml-3 h-5 w-5 text-stone-400" aria-hidden="true"/>
                </button>
            </div>
        </nav>)
}

export default Pagination;