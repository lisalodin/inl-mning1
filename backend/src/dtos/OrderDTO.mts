import type { ProductDTO } from "./ProductDTO.mjs";

export type OrderItemDTO = {
    product: ProductDTO;
    quantity: number;
};

export type OrderDTO = {
    id: number;
    customerName: string;
    customerEmail: string;
    date: Date;
    price: number;
    items: OrderItemDTO[];
};