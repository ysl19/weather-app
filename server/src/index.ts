import express from "express";
import cors from "cors";
import weatherRouter from "./routes/weather.ts";

const app = express();

const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/weather", weatherRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});