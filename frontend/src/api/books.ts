import axios, {AxiosResponse} from 'axios';
import {BookPreviewFullResponse} from "@/types/books_preview";
import {BookFullResponse} from "@/types/books_full_info";

const BASE_URL = (process.env.NEXT_PUBLIC_SERVER_ADDRESS || "http://127.0.0.1:80") + '/v1/books';

export const searchBooks = async (query: string, startIndex: number = 0): Promise<BookPreviewFullResponse> => {
    try {
        const response: AxiosResponse<BookPreviewFullResponse> = await axios.get(`${BASE_URL}/`, {
            params: {
                search: query,
                startIndex
            }
        });

        return response.data;
    } catch (error) {
        console.error(`An error occurred while fetching books information: ${error}`);
        throw error;
    }
};

export const searchBookById = async (id: string): Promise<BookFullResponse> => {
    try {
        const response: AxiosResponse<BookFullResponse> = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`An error occurred while fetching full book information: ${error}`);
        throw error;
    }
};

