import express, {Application, Request, Response} from "express" ;
import carRoutes from './routes/cars';
import { env } from "./config/env";
import { connectDB } from "./config/database";

const port = env.port
//const PORT = process.env.PORT || 2900;

const app: Application = express();

app.use(express.json());
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


// app.listen(PORT, () => {
//     console.log("Server is running on port", PORT);
//     });

    const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

};

startServer();
