# import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch
from app.main import app
from app.models.book_full_dto import BookFullDTO
from app.models.book_preview_dto import BooksPreviewDTO, BookPreviewDTO

client = TestClient(app)


@patch("app.services.books_service.search_books")
def test_search_books(mock_search_books):
    books_preview = BooksPreviewDTO(
        totalItems=2,
        items=[
            BookPreviewDTO(
                id="test_id",
                selfLink="www.google/test_id",
                title="test_title",
                authors=["author1", "author2"],
                publishedYear=2021,
                categories=["category1", "category2"],
                averageRating=4.5,
                thumbnail="www.google/test_id/image",
                infoLink="www.google/test_id/info_link",
            ),
            BookPreviewDTO(
                id="test_id_2",
                selfLink="www.google/test_id_2",
                title="test_title",
                authors=["author1", "author2"],
                publishedYear=2023,
                categories=["category1", "category2"],
                averageRating=4.5,
                thumbnail="www.google/test_id_2/image",
                infoLink="www.google/test_id_2/info_link",
            )

        ]
    )

    mock_search_books.return_value = books_preview

    response = client.get("/v1/books/?search=test+search")
    assert response.status_code == 200

    # Parse response to json
    response_data = response.json()

    # Assert specific properties
    assert response_data["totalItems"] == 2
    assert response_data["items"][0]["id"] == "test_id"
    assert response_data["items"][0]["title"] == "test_title"
    assert response_data["items"][0]["authors"][0] == "author1"
    assert response_data["items"][0]["publishedYear"] == 2021

    assert response_data["items"][1]["id"] == "test_id_2"
    assert response_data["items"][1]["title"] == "test_title"
    assert response_data["items"][1]["authors"][0] == "author1"
    assert response_data["items"][1]["publishedYear"] == 2023


@patch("app.services.books_service.search_book_by_id")
def test_search_book_by_id(mock_search_book_by_id):
    book_preview = BookFullDTO(
        id="test_id",
        title="test_title",
        authors=["author1", "author2"],
        publishedYear=2021,
        description="This is the book description.",
        ISBNs=['isbn1', 'isbn2'],
        categories=["category1", "category2"],
        averageRating=4.5,
        image="www.google/test_id/image",
        infoLink="www.google/test_id/info_link",
        buyLink="www.google/test_id/buy_link"
    )

    mock_search_book_by_id.return_value = book_preview

    response = client.get("/v1/books/test_id")
    assert response.status_code == 200

    # Parse response to json
    response_data = response.json()

    # Assert specific properties
    assert response_data["id"] == "test_id"
    assert response_data["title"] == "test_title"
    assert response_data["authors"][0] == "author1"
    assert response_data["publishedYear"] == 2021
    assert response_data["description"] == "This is the book description."
    assert response_data["ISBNs"][1] == 'isbn2'
    assert response_data["buyLink"] == "www.google/test_id/buy_link"
