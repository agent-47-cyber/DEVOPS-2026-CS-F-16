import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to Database
await connectDB();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Portfolio API Server Running' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
