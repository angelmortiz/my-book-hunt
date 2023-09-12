# My Book Hunt
### Overview

"My Book Hunt" is a web application designed to search for books using keywords and display the search results with book details sourced from the Google Books API. It is built using the Next.js framework with styling provided by Tailwind CSS and leverages FastAPI for the backend processing.

### Project Structure
> /backend - Contains the FastAPI backend application.\
> /frontend - Contains the frontend application developed using Next.js and Tailwind CSS.

## Repository Information
GitHub Repository: My Book Hunt
Clone the project using:
```
git clone https://github.com/angelmortiz/my-book-hunt.git
```

## Local Dev Setup Instructions
### Backend (FastAPI)

Navigate to the backend directory:
```batch
cd backend
```
> It's recommended to set up a virtual environment to isolate the project's dependencies.\

Create a virtual environment using:
```
python -m venv venv
```

Activate the virtual environment:
On macOS and Linux:
```
source venv/bin/activate
```
On Windows:
```
.\venv\Scripts\activate
```
Install the required dependencies:
> Use pip for Python 2, or pip3 for Python 3
```
pip install -r requirements.txt
```
Run the development server:
```
uvicorn app.main:app --host 0.0.0.0 --port 80 --reload
```
### Backend alternative using Docker
>Ensure you have Docker installed and running. Then simply bring up the service:

```
docker-compose up
```

Note: The docker-compose.yml contains instructions to build and run the application using Docker.

### Frontend (Next.js + Tailwind CSS)
Navigate to the frontend directory:
```
cd frontend
```

Install the required dependencies:
```
npm install
```

Start the development server:
```
npm run dev
```

## Current deployment

### Frontend (Next.js on AWS Amplify)
The frontend application was deployed using AWS Amplify. AWS Amplify makes it easy to create, configure, and implement scalable mobile and web apps powered by AWS. This ensures a globally available, fast-loading user interface for "My Book Hunt".

>Beta Version: [app.mybookhunt.com](https://app.mybookhunt.com)

### Backend (FastAPI on AWS ECS Fargate)
The backend API for "My Book Hunt" was deployed using AWS's Elastic Container Service (ECS) with the Fargate launch type. This allows for serverless container execution, ensuring seamless scalability and management.

>API Base URL: [api.mybookhunt.com](https://api.mybookhunt.com)


## Conclusion
Building this application was a comprehensive journey of integrating frontend and backend technologies to create a seamless book searching experience. Any feedback, contributions, or insights into refining "My Book Hunt" are always appreciated.