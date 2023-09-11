from pydantic import BaseModel
from typing import List, Optional


class ImageLinks(BaseModel):
    thumbnail: str
    small: Optional[str] = None
    medium: Optional[str] = None


class IndustryIdentifier(BaseModel):
    type: str
    identifier: str


class VolumeInfo(BaseModel):
    title: str
    subtitle: Optional[str] = None
    authors: Optional[List[str]] = None
    publisher: Optional[str] = None
    publishedDate: Optional[str] = None
    description: Optional[str] = None
    industryIdentifiers: Optional[List[IndustryIdentifier]] = None
    pageCount: Optional[int] = None
    categories: Optional[List[str]] = None
    averageRating: Optional[float] = None
    ratingsCount: Optional[int] = None
    contentVersion: Optional[str] = None
    imageLinks: ImageLinks
    language: Optional[str] = 'es'
    previewLink: Optional[str] = None
    infoLink: Optional[str] = None


class RetailPrice(BaseModel):
    amount: float
    currencyCode: Optional[str] = 'USD'


class SaleInfo(BaseModel):
    saleability: Optional[str] = None
    retailPrice: Optional[RetailPrice] = None
    buyLink: Optional[str] = None


class GoogleBookResponse(BaseModel):
    id: str
    selfLink: str
    volumeInfo: VolumeInfo
    saleInfo: Optional[SaleInfo] = None


class GoogleBooksResponse(BaseModel):
    totalItems: int
    items: List[GoogleBookResponse]
