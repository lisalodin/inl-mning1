import express, { json } from "express";
import cors from "cors";
// import { todoRouter } from "./routes/TodoRouter.mjs"; 
import mongoose from "mongoose";
import { config } from "dotenv";

config(); // Laddar miljövariabler från en .env-fil

const mongoUri = process.env.MONGO_URI || ""; // Hämtar MongoDB URI från miljövariabler, eller sätter den till en tom sträng om den inte är definierad
const PORT = process.env.PORT || 4000; // Hämtar portnummer från miljövariabler, eller sätter den till 4000 om den inte är definierad

if (mongoUri === "") { // Om mongoUri är en tom sträng, kasta ett fel
    throw "MONGO_URI does not exist in .env.";
}

const app = express(); // Skapar en Express-applikation

app.use(cors({origin: "http://localhost:5173"})); // Används för att tillåta CORS-förfrågningar från frontend som körs på localhost:5173
app.use(json()); // Används för att parsa JSON i request body


// Routes (lägger till senare)
// app.use("/products", productRouter);


app.listen(PORT, async (error) => {   // Hela funktionen som startar api:t
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
