import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import appointmentRoute from './routes/appointment.route.js';
import contactRoute from './routes/contact.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send("hello");
})

app.use('/api', appointmentRoute);
app.use('/api', contactRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is listening on port http://localhost:${PORT}`);
})
