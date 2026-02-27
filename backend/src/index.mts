import express, { json } from "express";
import cors from "cors";
import { productRouter } from "./routes/productRouter.mjs";
import { orderRouter } from "./routes/orderRouter.mjs";
import mongoose from "mongoose";
import { config } from "dotenv";

// Laddar variabler från en .env-fil
config(); 

 // Hämtar MongoDB URI från miljövariabler, eller sätter den till en tom sträng om den inte är definierad
const mongoUri = process.env.MONGO_URI || "";
// Hämtar portnummer från miljövariabler, eller sätter den till 4000 om den inte är definierad
const PORT = process.env.PORT || 3000; 

// Om mongoUri är en tom sträng, kasta ett fel
if (mongoUri === "") { 
    throw "MONGO_URI does not exist in .env.";
}
 // Skapar en Express-applikation
const app = express();

// Används för att tillåta CORS-förfrågningar från frontend som körs på localhost:5173
app.use(cors({origin: "http://localhost:5173"})); 
// Används för att parsa JSON i request bodyn, så att den kan användas i route handlers
app.use(json()); 


// Används för att hantera alla routes som börjar med /products med hjälp av productRouter
app.use("/products", productRouter); 
// Används för att hantera alla routes som börjar med /orders med hjälp av orderRouter
app.use("/orders", orderRouter); 

// Hela funktionen som startar api:t och ansluter till MongoDB är innesluten i en try-catch block för att hantera eventuella fel som kan uppstå under anslutningen. Om anslutningen lyckas, loggas ett meddelande som indikerar att API:t körs och är anslutet till databasen. Om det uppstår ett fel, loggas ett felmeddelande.
app.listen(PORT, async (error) => {   
    try {
        if (error) {
            console.error(error);
        }
        await mongoose.connect(mongoUri); 
            console.log(`Api is running on port: ${PORT}, connected to the database`);
    } catch (error) {
          console.error("Failed to connect to MongoDB:", error);
    }
});
