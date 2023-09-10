from fastapi import APIRouter, Query

from app.models.book_query import BookSearchQuery
from app.services import books_service
from app.core.constants import (
    DEFAULT_START_INDEX,
    DEFAULT_PAGE_SIZE,
    MAX_PAGE_SIZE
)

router = APIRouter()


@router.get("/")
async def search_books(
        search: str = Query(None, description="General search query for books"),
        title: str = Query(None, description="Search by book title"),
        author: str = Query(None, description="Search by book author"),
        publisher: str = Query(None, description="Search by book publisher"),
        category: str = Query(None, description="Search by book category"),
        isbn: str = Query(None, description="Search by book ISBN"),
        startIndex: int = Query(DEFAULT_START_INDEX, description="Starting index for pagination", ge=0),
        pageSize: int = Query(DEFAULT_PAGE_SIZE, description="Number of results per page", ge=0, le=MAX_PAGE_SIZE)
):
    # Create an instance of BookSearchQuery using the provided parameters
    book_query = BookSearchQuery(search, title, author, publisher, category, isbn)

    # Use the book service function to get the results
    return await books_service.search_books(book_query, startIndex, pageSize)


@router.get("/{bookId}")
async def search_book_by_id(bookId: str):
    return await books_service.search_book_by_id(bookId)
