export interface IOrder {
    _id: string;
    userId: string;
    products: Product[];
    price: number;
    status: string;
    address: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface Product {
    productId: string;
    quantity: number;
    _id: string;
}

