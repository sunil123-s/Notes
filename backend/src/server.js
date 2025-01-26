import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectdb } from "./config/databaseUrl.js";
import userRoutes from "./routes/userRoutes.js"
import notesRoutes from "./routes/noteRoutes.js"

dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET','POST','DELETE','PUT'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", userRoutes)
app.use("/api/note", notesRoutes)


connectdb()
  .then(() => {
    console.log("Mongodb Connected");
    app.listen(PORT, () => console.log(`server is running on ${PORT}`));
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
  });