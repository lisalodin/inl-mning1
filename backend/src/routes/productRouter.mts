import express from "express";
import { 
    getProducts, 
    getProduct, 
    createProduct, 
    updateProduct, 
    removeProduct 
} from "../controllers/productController.mjs";

export const productRouter = express.Router();  // Skapar en router för produkter

// Routern hanterar alla endpoints relaterade till produkter
// inklusive CRUD-operationer (Create, Read, Update, Delete)

// GET /products - Hämta alla
productRouter.get("/", async (req,res) => {
    try {
        const { q, sort } = req.query;
        const products = await getProducts(q as string, sort as string);  
        res.status(200).json(products);   
    } catch (error) {
        console.error(error);  
        res.status(500).json({ message: error });
    }
});

// GET /products/:id - Hämta en
productRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await getProduct(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// POST /products - Skapa ny
productRouter.post("/", async (req, res) => {
    try {
        const { name, price } = req.body;
        if (!name || !price) {
            res.status(400).json({ message: "Name and price are required" });
            return;
        }
        const newProduct = await createProduct(name, price);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// PUT /products/:id - Uppdatera
productRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price } = req.body;
        const updated = await updateProduct(id, name, price);
        if (updated) {
            res.status(200).json(updated);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE /products/:id - Ta bort
productRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("DELETE request for id:", id);  // ← Finns denna?
        const removed = await removeProduct(id);
        console.log("Remove result:", removed);      // ← Och denna?
        if (removed) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
