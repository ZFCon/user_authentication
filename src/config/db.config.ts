import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGO_URI: string = process.env.MONGO_URI || 'mongodb://localhost:27017';

const connectDB = async () => {
  mongoose
    .connect(MONGO_URI, {})
    .then(() => {
      console.log('Connected to DB');
    })
    .catch((err) => {
      console.error("Couldn't connect to db due: ", err.message);
      process.exit(1);
    });
};

export default connectDB;
