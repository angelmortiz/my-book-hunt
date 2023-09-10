from pydantic import BaseModel
from typing import List, Optional


class ImageLinks(BaseModel):
    thumbnail: str


class VolumeInfo(BaseModel):
    title: str
    authors: Optional[List[str]] = None
    publishedDate: Optional[str] = None
    description: Optional[str] = None
    categories: Optional[List[str]] = None
    averageRating: Optional[float] = None
    imageLinks: ImageLinks
    infoLink: Optional[str] = None


class GoogleBookLiteResponse(BaseModel):
    id: str
    selfLink: str
    volumeInfo: VolumeInfo


class GoogleBooksLiteResponse(BaseModel):
    totalItems: int
    items: List[GoogleBookLiteResponse]

