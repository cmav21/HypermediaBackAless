import express from "express";
import router from "./routes/routes";

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());

app.use('/api',router);

export default app;