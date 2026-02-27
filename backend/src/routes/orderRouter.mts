import express from "express"; 
import {
    getOrder,
    getOrders,
    createOrder,
    removeOrder
} from "../controllers/orderController.mjs"; 

export const orderRouter = express.Router();

// GET /orders - Hämta alla
orderRouter.get("/", async (req,res) => {
    try {
        const { q, sort } = req.query;
        const orders = await getOrders(q as string, sort as string);  
        res.status(200).json(orders);   
    } catch (error) {
        console.error(error);  
        res.status(500).json({ message: error });
    }
});

// GET /orders/:id - Hämta en
orderRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const order = await getOrder(id);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// POST /orders - Skapa ny
orderRouter.post("/", async (req, res) => {
    try {
        const { customerName, customerEmail, items } = req.body;
        if (!customerName || !customerEmail || !items) {
            res.status(400).json({ message: "Customer name, email and items are required" });
            return;
        }
        const newOrder = await createOrder(customerName, customerEmail, items);
        res.status(201).json(newOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE /orders/:id - Ta bort
orderRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const removed = await removeOrder(id);
        if (removed) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});