import re
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

from app.models.g_book_response import GoogleBookResponse


class BookFullDTO(BaseModel):
    id: str
    title: str
    subtitle: Optional[str] = None
    authors: List[str]
    publisher: str
    publishedYear: Optional[int] = None
    description: Optional[str] = None
    ISBNs: Optional[list[str]] = None
    pageCount: Optional[int] = None
    categories: Optional[List[str]] = None
    averageRating: Optional[float] = None
    image: str
    previewLink: Optional[str] = None
    infoLink: Optional[str] = None
    buyLink: Optional[str] = None
    price: Optional[float] = None
    currencyCode: Optional[str] = 'USD'

    @classmethod
    def from_google_response(cls, google_book: GoogleBookResponse) -> 'BookFullDTO':
        return cls(
            id=google_book.id,
            title=google_book.volumeInfo.title,
            subtitle=google_book.volumeInfo.subtitle,
            authors=google_book.volumeInfo.authors,
            publisher=google_book.volumeInfo.publisher,
            publishedYear=datetime.strptime(google_book.volumeInfo.publishedDate, '%Y-%m-%d').year
                            if google_book.volumeInfo.publishedDate else None,
            description=BookFullDTO.remove_html_tags(google_book.volumeInfo.description),
            ISBNs=[ISBNs.identifier for ISBNs in google_book.volumeInfo.industryIdentifiers]
                    if google_book.volumeInfo.industryIdentifiers else None,
            pageCount=google_book.volumeInfo.pageCount,
            categories=google_book.volumeInfo.categories,
            averageRating=google_book.volumeInfo.averageRating,
            image=google_book.volumeInfo.imageLinks.medium if google_book.volumeInfo.imageLinks.medium
                            else google_book.volumeInfo.imageLinks.thumbnail,
            previewLink=google_book.volumeInfo.previewLink,
            infoLink=google_book.volumeInfo.infoLink,
            buyLink=google_book.saleInfo.buyLink if google_book.saleInfo else None,
            price=google_book.saleInfo.retailPrice.amount if google_book.saleInfo
                    and google_book.saleInfo.retailPrice else None,
            currencyCode=google_book.saleInfo.retailPrice.currencyCode if google_book.saleInfo
                            and google_book.saleInfo.retailPrice else 'USD'
        )

    @staticmethod
    def remove_html_tags(text: str) -> str:
        pattern = re.compile('<.*?>')
        return re.sub(pattern, '', text)
