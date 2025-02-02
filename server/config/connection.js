import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mern-shopping');

export default mongoose.connection;
