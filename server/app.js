import express from "express";
import cors from "cors";
import { router as bank } from "./routes/bank.js";

const app = express();
app.use(express.json());
app.use("/api/bank", bank);
app.use(cors);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));