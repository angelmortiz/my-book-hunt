import os
import httpx
from fastapi import HTTPException
from pydantic import ValidationError

from app.models.g_book_response import GoogleBookResponse
from app.models.g_book_lite_response import GoogleBooksLiteResponse
from app.core.constants import (
    DEFAULT_START_INDEX,
    DEFAULT_PAGE_SIZE,
    GOOGLE_BOOKS_API_ADDRESS
)


async def query_books_google_api(query: str, start_index: int = DEFAULT_START_INDEX,
                                 page_size: int = DEFAULT_PAGE_SIZE):
    """
    Query books on Google Books API using the query parameters provided.
    """
    api_key = os.getenv("GOOGLE_BOOKS_API_KEY")

    params = {
        'q': query,
        'startIndex': start_index,
        'maxResults': page_size,
        'filter': 'paid-ebooks',
        'printType': 'books',
        'key': api_key
    }

    # Using an asynchronous context manager for the client
    async with httpx.AsyncClient() as client:
        response = await client.get(GOOGLE_BOOKS_API_ADDRESS, params=params)

    # Check if the request was successful
    if response.status_code == 200:
        try:
            # Deserialize each book item into a Pydantic model
            books_info = GoogleBooksLiteResponse.model_validate(response.json())
            return books_info
        except ValidationError as e:
            # Raise error if pydantic cannot map json values to class
            raise HTTPException(status_code=400, detail=f"Error processing the books data: {e}")
    else:
        # This will be caught by FastAPIs error handler.
        raise HTTPException(status_code=response.status_code, detail=response.text)


async def query_book_google_api(volumeId: str):
    """
    Query one single book on Google Books API using the volume id provided.
    """

    api_key = os.getenv("GOOGLE_BOOKS_API_KEY")
    api_url = f"{GOOGLE_BOOKS_API_ADDRESS}/{volumeId}"

    params = {
        'key': api_key
    }

    # Using an asynchronous context manager for the client
    async with httpx.AsyncClient() as client:
        response = await client.get(api_url, params=params)

    # Check if the request was successful
    if response.status_code == 200:
        try:
            # Deserialize each book item into a Pydantic model
            book_info = GoogleBookResponse.model_validate(response.json())
            return book_info
        except ValidationError as e:
            # Raise error if pydantic cannot map json values to class
            raise HTTPException(status_code=400, detail=f"Error processing the book data: {e}")
    else:
        # This will be caught by FastAPIs error handler.
        raise HTTPException(status_code=response.status_code, detail=response.text)
