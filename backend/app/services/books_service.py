from app.models.book_query import BookSearchQuery
from app.models.book_full_dto import BookFullDTO
from app.models.book_preview_dto import BooksPreviewDTO
from app.services import g_books_service


async def search_books(query: BookSearchQuery, start_index: int, page_size: int):
    """
    Create the search query that will be sent to Google Books API to get a list of books.
    """
    google_query = ""
    if query.search:
        google_query += query.search
    if query.title:
        google_query += f'&intitle:{query.title}'
    if query.author:
        google_query += f'&inauthor:{query.author}'
    if query.publisher:
        google_query += f'&inpublisher:{query.publisher}'
    if query.category:
        google_query += f'&subject:{query.category}'
    if query.isbn:
        google_query += f'&isbn:{query.isbn}'

    # Removes the initial '&' if a query.search was not provided
    google_query = google_query if google_query[0] != '&' else google_query[1:]

    g_google_books = await g_books_service.query_books_google_api(google_query, start_index, page_size)
    return BooksPreviewDTO.from_google_response(g_google_books)


async def search_book_by_id(bookId: str):
    """
    Search the full information of one book by its id.
    """
    g_google_book = await g_books_service.query_book_google_api(bookId)
    return BookFullDTO.from_google_response(g_google_book)
