import axios, {AxiosResponse} from 'axios';
import {GoogleBooksLiteResponse} from "@/types/books_preview";
import {GoogleBookFullResponse} from "@/types/books_full_info";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_ADDRESS + '/v1/books';

export const searchBooks = async (query: string): Promise<GoogleBooksLiteResponse> => {
    try {
        const response: AxiosResponse<GoogleBooksLiteResponse> = await axios.get(`${BASE_URL}/`, {
            params: {
                search: query
            }
        });

        return response.data;
    } catch (error) {
        console.error(`An error occurred while fetching books information: ${error}`);
        throw error;
    }
};

export const searchBookById = async (id: string): Promise<GoogleBookFullResponse> => {
    try {
        const response: AxiosResponse<GoogleBookFullResponse> = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`An error occurred while fetching full book information: ${error}`);
        throw error;
    }
};

