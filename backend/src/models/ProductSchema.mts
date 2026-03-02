import { Schema, model } from "mongoose";


// Skapar ett Mongoose-schema för en "Product" med tre fält: id, name och price. Alla fält är obligatoriska.
const productSchema = new Schema({  
    id: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true }
});

// Skapar och exporterar en Mongoose-modell baserat på det definierade schemat, som kan användas för att interagera med "Product" samlingen i MongoDB.
export const ProductModel = model("Product", productSchema); 