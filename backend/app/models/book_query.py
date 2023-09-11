from dataclasses import dataclass


@dataclass
class BookSearchQuery:
    search: str = None
    title: str = None
    author: str = None
    publisher: str = None
    category: str = None
    isbn: str = None

    def __int__(self, search, title, author, publisher, category, isbn):
        self.search = search
        self.title = title
        self.author = author
        self.publisher = publisher
        self.category = category
        self. isbn = isbn
