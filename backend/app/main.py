from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.api import router as api_router

load_dotenv()

app = FastAPI()

app.include_router(api_router, prefix="/v1")

# Set up CORS
origins = [
    "http://localhost:3000",  # Allow requests from your frontend during local development
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Welcome to My Book Hunt app."}
