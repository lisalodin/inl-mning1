import { Product } from "../models/Product.mjs";
import { ProductModel } from "../models/ProductSchema.mjs";

// Hämta alla produkter från databasen för att visa i frontend 
export const getProducts = async () => {
    const products = await ProductModel.find();
    return products;
};

// Hämta en produkt från databasen baserat på id för att visa i frontend
export const getProduct = async (id: string) => {
    const product = await ProductModel.findOne({ id: +id });
    return product;
};

// Skapa ny produkt
export const createProduct = async (name: string, price: number) => {
    const newProduct = new Product(Date.now(), name, price);
    const created = await ProductModel.create(newProduct);
    return created;
};

// Uppdatera produkt
export const updateProduct = async (id: string, name: string, price: number) => {
    const updated = await ProductModel.findOneAndUpdate(
        { id: +id },
        { name, price },
        { new: true }
    );
    return updated;
};

// Ta bort produkt
export const removeProduct = async (id: string) => {
    const removed = await ProductModel.findOneAndDelete({ id: +id });
    return removed ? true : false;
};
