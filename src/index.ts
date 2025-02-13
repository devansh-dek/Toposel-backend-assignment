import express, { Application } from 'express';
import cors from 'cors';
import { config } from './config/config';

const app: Application = express();
const port = config.port;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
