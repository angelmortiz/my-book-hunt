from fastapi import APIRouter
from .routes import books

router = APIRouter()

router.include_router(books.router, prefix="/books", tags=["Books"])