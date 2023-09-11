from fastapi.testclient import TestClient
from unittest.mock import patch
from app.main import app
from app.models import g_book_lite_response
from app.models.g_book_lite_response import (
    GoogleBooksLiteResponse,
    GoogleBookLiteResponse)
from app.models import g_book_response
from app.models.g_book_response import GoogleBookResponse

client = TestClient(app)


@patch("app.services.g_books_service.query_books_google_api")
def test_search_books(mock_query_books_google_api):
    g_google_books = GoogleBooksLiteResponse(
        totalItems=2,
        items=[
            GoogleBookLiteResponse(
                id="test_id_1",
                selfLink="www.google/test_id",
                volumeInfo=g_book_lite_response.VolumeInfo(
                    title="test title 1",
                    authors=["author1", "author2"],
                    publishedDate="2021-08-01",
                    categories=["category1", "category2"],
                    averageRating=4.5,
                    imageLinks=g_book_lite_response.ImageLinks(
                        thumbnail="www.google/test_id/image"
                    ),
                    infoLink="www.google/test_id/info_link",
                ),
            ),
            GoogleBookLiteResponse(
                id="test_id_2",
                selfLink="www.google/test_id_2",
                volumeInfo=g_book_lite_response.VolumeInfo(
                    title="test title 2",
                    authors=["author1", "author2"],
                    publishedDate="2023-08-01",
                    categories=["category1", "category2"],
                    averageRating=5.0,
                    imageLinks=g_book_lite_response.ImageLinks(
                        thumbnail="www.google/test_id/image_2"
                    ),
                    infoLink="www.google/test_id/info_link_2",
                ),
            )

        ]
    )

    mock_query_books_google_api.return_value = g_google_books

    response = client.get("/v1/books/?search=test+search")
    assert response.status_code == 200

    # Parse response to json
    response_data = response.json()

    # Assert specific properties
    assert response_data["totalItems"] == 2
    assert response_data["items"][0]["id"] == "test_id_1"
    assert response_data["items"][0]["title"] == "test title 1"
    assert response_data["items"][0]["authors"][0] == "author1"
    assert response_data["items"][0]["publishedYear"] == 2021

    assert response_data["items"][1]["id"] == "test_id_2"
    assert response_data["items"][1]["title"] == "test title 2"
    assert response_data["items"][1]["authors"][0] == "author1"
    assert response_data["items"][1]["publishedYear"] == 2023


@patch("app.services.g_books_service.query_book_google_api")
def test_search_book_by_id(mock_query_book_google_api):
    g_google_book = GoogleBookResponse(
        id="test_id_1",
        selfLink="www.google/test_id",
        volumeInfo=g_book_response.VolumeInfo(
            title="test title 1",
            authors=["author1", "author2"],
            description="This is the book description.",
            publishedDate="2023-08-01",
            categories=["category1", "category2"],
            averageRating=4.5,
            imageLinks=g_book_response.ImageLinks(
                thumbnail="www.google/test_id/image"
            ),
            infoLink="www.google/test_id/info_link",
        ),
    )

    mock_query_book_google_api.return_value = g_google_book

    response = client.get("/v1/books/test_id")
    assert response.status_code == 200

    # Parse response to json
    response_data = response.json()

    # Assert specific properties
    assert response_data["id"] == "test_id_1"
    assert response_data["title"] == "test title 1"
    assert response_data["authors"][0] == "author1"
    assert response_data["description"] == "This is the book description."
    assert response_data["publishedYear"] == 2023
    assert response_data["image"] == "www.google/test_id/image"
    assert response_data["infoLink"] == "www.google/test_id/info_link"
