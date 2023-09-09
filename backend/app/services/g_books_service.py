import os
import httpx
from fastapi import HTTPException

from app.core.constants import (
    DEFAULT_START_INDEX,
    DEFAULT_PAGE_SIZE,
    GOOGLE_BOOKS_API_ADDRESS
)


async def query_books_google_api(query: str, start_index: int = DEFAULT_START_INDEX, page_size: int = DEFAULT_PAGE_SIZE):
    """
    Query books on Google Books API using the parameters sent by the user.
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
        return response.json()
    else:
        # This will be caught by FastAPIs error handler.
        raise HTTPException(status_code=response.status_code, detail=response.text)
