import { Product } from "../models/Product.mjs";
import { ProductModel } from "../models/ProductSchema.mjs";

// Denna fil skapar objekt och pratar med databasen från router-filen
// Den importerar Product-klassen och ProductModel från sina respektive filer, som används för att skapa nya produktobjekt 
// Den innehåller alla funktioner som hanterar logiken för att hämta, skapa, uppdatera och ta bort produkter i databasen
// Dessa funktioner används av router-filen för att utföra de olika operationerna när API-anrop görs från frontend

// Hämta alla produkter från databasen för att visa i frontend och filtrera/sortera baserat på query params
export const getProducts = async (q?: string, sort?: string) => {
    const products = await ProductModel.find();
    let filteredList = [...products]; // Skapar en kopia av produktlistan för att kunna filtrera och sortera utan att ändra originalet
    if (q) { 
        filteredList = filteredList.filter((p) =>
            p.name.toLowerCase().startsWith(q.toLowerCase()),);}  // Filtrerar produkterna baserat på query parametern "q" som skickas från frontend, och jämför den med produktnamnen i databasen. Använder startsWith för att matcha början av produktnamnet
    if (sort) {
        if ((sort as string) === "asc") {   
            filteredList.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if (b.name.toLowerCase() < a.name.toLowerCase()) return 1;
                return 0;
             });
        } else {
            filteredList.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                if (b.name.toLowerCase() < a.name.toLowerCase()) return -1;
                return 0;
             });
        }
    }
    return filteredList; // Returnerar den filtrerade och sorterade listan av produkter till frontend
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
