import express, {Application, Request, Response} from "express" ;
import carRoutes from './routes/cars';
import { env } from "./config/env";
import { connectDB } from "./config/database";
import {authenticateKey} from './middleware/auth.middleware';
import { logger } from './middleware/logger.middleware';
import swaggerUi from 'swagger-ui-express' 
import { swaggerSpec } from "./config/swagger";
import cors from 'cors';
import { errorHandler } from "./middleware/error.middleware";

const port = env.port
//const PORT = process.env.PORT || 2900;

export const app: Application = express();

app.use(
'/api-docs',
swaggerUi.serve,
swaggerUi.setup(swaggerSpec)
);

// Special code to add a delay - remove later
//app.use((_req, _res, next) => setTimeout(next, 2000));


app.use(logger);
app.use(express.json());
app.use(cors());
app.use('/api/v1/cars', carRoutes);


app.use((req, _res, next) => {  
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.get("/ping", async (_req : Request, res: Response) => {
    res.json({
    message: "Greetings from Kevin Staunton" 
    });
});

app.get('/bananas', async (_req : Request, res: Response) => {
    res.json({
    message: "this is bananas",
    });
});

app.get('/sneed', async (_req : Request, res: Response) => {
    res.json({
    message: "Sneed's Feed & Seed, Formerly Chuck's",
    });
});

app.get("/pong", (_req : Request, res: Response) => {
    console.log("Received request to /pong");
    throw new Error("Simulated error in /pong route");
});

app.get("/pung", async (_req : Request, res: Response) => {
    console.log("Received request to /pung");
     throw new Error("Simulated error in /pung route");
});

app.use(errorHandler);



// app.listen(PORT, () => {
//     console.log("Server is running on port", PORT);
//     });

//     const startServer = async () => {
//   await connectDB();

//   app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
//   });

// };

//startServer();
