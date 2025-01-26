import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectdb = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
};
