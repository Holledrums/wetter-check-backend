import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { getWeather } from "./weather.service";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.get("/weather", async (req, res) => {
  const city =
    req.query.city?.toString() || process.env.DEFAULT_CITY || "Berlin";

  try {
    const data = await getWeather(city);
    res.json(data);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || "Unbekannter Fehler" });
  }
});

app.listen(PORT, () => {
  console.log(`🌤️ Wetter-API läuft auf http://localhost:${PORT}`);
});
