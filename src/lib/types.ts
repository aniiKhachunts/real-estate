export type PropertyType = "apartment" | "house" | "villa" | "studio";

export type Property = {
    id: string;
    title: string;
    price: number;
    currency?: string;
    type: PropertyType;
    beds: number;
    baths: number;
    areaM2: number;
    address: { city: string; area?: string };
    images?: string[];
    description?: string;
};
