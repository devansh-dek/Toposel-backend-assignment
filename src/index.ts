import express, { Application } from 'express';
import cors from 'cors';
import { config } from './config/config';
import userRoutes from './routes/user.routes';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";

const app: Application = express();
const port = config.port;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);

// Basic health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: 'error',
    message: 'Something went wrong!'
  });
});
const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectDB();
  app.listen(port, () => console.log(`🚀 Server is running on port ${port}`));
};

startServer();

export default app;
