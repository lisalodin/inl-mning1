// Skapar en typ för en order
export type Order = {
    id: number;
    customerName: string;
    customerEmail: string;
    price: number;
    date: string;
    items: {
        productId: number;
        quantity: number;
    }[];    
};