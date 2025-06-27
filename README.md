# 🌤️ Wetter Backend

A lightweight weather API built with Node.js, Express, and TypeScript – powered by [Open-Meteo](https://open-meteo.com/).  
It provides a simple endpoint to fetch the next 6 hours of hourly weather data for a given German city.

---

## 📦 Tech Stack

- Node.js
- Express.js
- TypeScript
- Axios
- dotenv

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/wetter-backend.git
cd wetter-backend
```

2. Install dependencies

```bash
Kopieren
Bearbeiten
npm install
```

3. Create a .env file

```bash
DEFAULT_CITY=Leipzig
WEATHER_API_BASE_URL=https://api.open-meteo.com/v1/
```

4. Start the server

```bash
npm run dev
```

🌐 API Endpoint

```bash
GET /weather?city=Berlin
```

### Response Example

```json
{
  "city": "Leipzig",
  "forecast": [
    {
      "time": "2025-06-27T09:00",
      "temperature": "21.7 °C",
      "windspeed": "17.1 km/h",
      "winddirection": "W",
      "isDay": 1,
      "weatherDescription": "Partly cloudy",
      "precipitation": "0"
    }
  ]
}
```
