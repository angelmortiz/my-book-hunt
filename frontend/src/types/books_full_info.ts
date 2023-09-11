export type BookFullResponse = {
    id: string;
    title: string;
    subtitle?: string;
    authors: string[];
    publisher: string;
    publishedYear?: number;
    description?: string;
    ISBNs?: string[];
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
    image: string;
    previewLink?: string;
    infoLink?: string;
    buyLink?: string;
    price?: number;
    currencyCode?: string;
}