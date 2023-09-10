export type ImageLinks = {
    thumbnail: string;
    small?: string;
    medium?: string;
}

export type IndustryIdentifier = {
    type: string;
    identifier: string;
}

export type VolumeInfo = {
    title: string;
    subtitle?: string;
    authors: string[];
    publisher: string;
    publishedDate?: string;
    description?: string;
    industryIdentifiers?: IndustryIdentifier[];
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;
    contentVersion?: string;
    imageLinks: ImageLinks;
    language?: string;
    previewLink?: string;
    infoLink?: string;
}

export type RetailPrice = {
    amount: number;
    currencyCode?: string;
}

export type SaleInfo = {
    saleability?: string;
    retailPrice?: RetailPrice;
    buyLink?: string;
}

export type GoogleBookFullResponse = {
    id: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
    saleInfo?: SaleInfo;
}