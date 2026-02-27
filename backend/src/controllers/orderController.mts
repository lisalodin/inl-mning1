import { OrderModel, convertDbOrderToDTO } from "../models/Order.mjs";


// Hämtar alla orders
export const getOrders = async (q?: string, sort?: string) => {
    const orders = await OrderModel.find();
    let filteredList = [...orders];
    if (q) {
        filteredList = filteredList.filter(order =>
            order.customerName.toLowerCase().includes(q.toLowerCase())
        );
    }
    if (sort) {
        filteredList.sort((a, b) => {
            if (sort === "asc") {
                return a.customerName.toLowerCase() < b.customerName.toLowerCase() ? -1 : 1;
            } else {
                return a.customerName.toLowerCase() > b.customerName.toLowerCase() ? -1 : 1;
            }
        });
    }
    return filteredList;
};

// Hämtar en order
export const getOrder = async (id: string) => {
    return await OrderModel.findOne({ id: +id });
};

// Skapar ny order
export const createOrder = async (
    customerName: string,
    customerEmail: string,
    items: { productId: number; productName: string; price: number; quantity: number }[]
) => {
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const newOrder = {
        id: Date.now(),
        customerName,
        customerEmail,
        date: new Date(),
        price: totalPrice,
        items
    };
    return await OrderModel.create(newOrder);
};

// Tar bort order
export const removeOrder = async (id: string) => {
    const removed = await OrderModel.findOneAndDelete({ id: +id });
    return removed ? true : false;
};