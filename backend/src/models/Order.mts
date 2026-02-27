import { Schema, model, type InferSchemaType } from "mongoose";
import { ProductModel } from "./ProductSchema.mjs";
import type { OrderDTO } from "../dtos/OrderDTO.mts";

// Denna fil definierar scheman och modeller för att representera en "Order" i en databasen
// inklusive struktur "OrderItem" som representerar varje produkt i en order
// Den exporterar också en type baserad på schemat för att underlätta resten av koden

// Definierar ett Mongoose-schema för en "OrderItem" som specificerar vilka fält som ingår i en orderpost och deras datatyper, samt att de är obligatoriska
const orderItemSchema = new Schema({
    productId: { type: Number, required: true },
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

// Definierar ett Mongoose-schema för en "Order" som specificerar vilka fält som ingår i en order och deras datatyper, samt att de är obligatoriska
 const orderSchema = new Schema({  
     id: { type: Number, required: true },
     customerName: { type: String, required: true },
     customerEmail: { type: String, required: true },
     date: { type: Date, required: true },
     price: { type: Number, required: true },
     items: [orderItemSchema]  // ← Lägg till denna rad
});

// Skapar och exporterar en Mongoose-modell baserat på det definierade schemat, som kan användas för att interagera med "Order" samlingen i MongoDB
export const OrderModel = model("Order", orderSchema); 

// Skapar en TypeScript-typ baserad på det definierade Mongoose-schemat som gör det möjligt att använda typen i resten av koden när man arbetar med "Order" data som hämtas från databasen
export type OrderFromDB = InferSchemaType<typeof orderSchema>;


// En funktion som konverterar en order som hämtats från databasen (OrderFromDB) till
// ett Data Transfer Object (OrderDTO) som kan användas i resten av appen,
// vilket gör det enklare att hantera och överföra orderdata
export const convertDbOrderToDTO = (dbOrder: OrderFromDB): OrderDTO => {
    return {
        id: dbOrder.id,
        customerName: dbOrder.customerName,
        customerEmail: dbOrder.customerEmail,
        date: dbOrder.date,
        price: dbOrder.price,
        items: dbOrder.items.map(item => ({
            product: {
                id: item.productId,
                name: item.productName,
                price: item.price
            },
            quantity: item.quantity
        }))
    };
};