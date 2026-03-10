export type STLParams = {
    nwLat: number,
    nwLng: number,
    seLat: number,
    seLng: number,
    zScale: number,
};

export interface Order {
    orderId: string;
    status?: string;
    amount?: number;

    customerFirstName: string;
    customerLastName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: string;
    postalCode: string;
    city: string;
    shippingMethod: string;

    coordinates: {
        north: number;
        south: number;
        east: number;
        west: number;
    };
    zScale: number;
    scale: number;
    frame: string;
    passepartout: string;
}