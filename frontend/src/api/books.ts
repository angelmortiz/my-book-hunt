import axios, {AxiosResponse} from 'axios';
import {GoogleBooksLiteResponse} from "@/types/books";

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
