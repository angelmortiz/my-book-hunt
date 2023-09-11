from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

from .g_book_lite_response import GoogleBooksLiteResponse, GoogleBookLiteResponse


class BookPreviewDTO(BaseModel):
    id: str
    selfLink: Optional[str] = None
    title: Optional[str] = None
    authors: Optional[List[str]] = None
    publishedYear: Optional[int] = None
    categories: Optional[List[str]] = None
    averageRating: Optional[float] = None
    thumbnail: Optional[str] = None
    infoLink: Optional[str] = None
    # description: Optional[str] = None # Might be used in the future

    @classmethod
    def map_items(cls, google_book: GoogleBookLiteResponse) -> 'BookPreviewDTO':
        published_year = None

        if google_book.volumeInfo.publishedDate:
            date_str = google_book.volumeInfo.publishedDate
            if "-" in date_str:  # Check if the date is in the format '%Y-%m-%d'
                published_year = datetime.strptime(date_str, "%Y-%m-%d").year
            else:
                published_year = int(date_str)  # Assume the date is just a year

        return BookPreviewDTO(
            id=google_book.id,
            selfLink=google_book.selfLink,
            title=google_book.volumeInfo.title,
            authors=google_book.volumeInfo.authors if google_book.volumeInfo.authors else None,
            publishedYear=published_year,
            categories=google_book.volumeInfo.categories,
            averageRating=google_book.volumeInfo.averageRating,
            thumbnail=google_book.volumeInfo.imageLinks.thumbnail,
            infoLink=google_book.volumeInfo.infoLink,
            # description=google_book.volumeInfo.description # Might be used in the future
        )


class BooksPreviewDTO(BaseModel):
    totalItems: Optional[int] = None
    items: Optional[List[BookPreviewDTO]] = None

    @classmethod
    def from_google_response(cls, google_books: GoogleBooksLiteResponse) -> 'BooksPreviewDTO':
        return BooksPreviewDTO(
            totalItems=google_books.totalItems,
            items=[BookPreviewDTO.map_items(item) for item in google_books.items]
        )
