from fastapi import APIRouter, Query

router = APIRouter()


@router.get("")
async def search_books(q: str = Query(..., description="Search query for books")):
    # For now, we'll just return the query for testing purposes
    return {"query": q}
