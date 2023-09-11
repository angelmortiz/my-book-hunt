export type BookPreviewResponse = {
    id: string;
    selfLink?: string;
    title: string;
    authors: string[];
    publishedYear?: number;
    categories?: string[];
    averageRating?: number;
    thumbnail?: string;
    infoLink?: string;
}

export type BookPreviewFullResponse = {
    totalItems?: number;
    items: BookPreviewResponse[];
}
