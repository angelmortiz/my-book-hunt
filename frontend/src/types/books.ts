// TODO: Flatten these types on the backend to only have one level
export type ImageLinks = {
    thumbnail: string;
}

export type VolumeInfo = {
    title: string;
    authors: string[];
    publishedDate?: string;
    description?: string;
    categories?: string[];
    averageRating?: number;
    imageLinks: ImageLinks;
    infoLink?: string;
}

export type GoogleBookLiteResponse = {
    id: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
}

export type GoogleBooksLiteResponse = {
    totalItems: number;
    items: GoogleBookLiteResponse[];
}