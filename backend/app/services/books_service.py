from ..models.book_query import BookSearchQuery
from .g_books_service import query_books_google_api


async def search_books(query: BookSearchQuery, start_index: int, page_size: int):
    """
    Create the search query that will be sent to Google Books API to get a list of books.
    """
    google_query = ""
    if query.search:
        google_query += query.search.replace(" ", "+")
    if query.title:
        google_query += f'&intitle:{query.title.replace(" ", "+")}'
    if query.author:
        google_query += f'&inauthor:{query.author.replace(" ", "+")}'
    if query.publisher:
        google_query += f'&inpublisher:{query.publisher.replace(" ", "+")}'
    if query.category:
        google_query += f'&subject:{query.category.replace(" ", "+")}'
    if query.isbn:
        google_query += f'&isbn:{query.isbn.replace(" ", "+")}'

    # Removes the initial '&' if a query.search was not provided
    google_query = google_query if google_query[0] != '&' else google_query[1:]

    return await query_books_google_api(google_query, start_index, page_size)
