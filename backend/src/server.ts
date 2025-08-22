import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import router from './routes/auth.js';


const port = process.env.PORT;
import connectDB from './config/db.js';


connectDB();

app.use(express.json());
app.use('/',router);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});