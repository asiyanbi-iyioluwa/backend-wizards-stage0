import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/me", async (req, res) => {
  try {
    const response = await axios.get("https://catfact.ninja/fact", { timeout: 5000 });
    const catFact = response.data.fact;

    const data = {
      status: "success",
      user: {
        email: process.env.USER_EMAIL,
        name: process.env.USER_NAME,
        stack: process.env.USER_STACK,
      },
      timestamp: new Date().toISOString(),
      fact: catFact,
    };

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(data);

  } catch (error) {
    console.error("Error fetching cat fact:", error.message);

    // Fallback in case of API failure
    return res.status(500).json({
      status: "error",
      message: "Could not fetch cat fact at this time. Please try again later.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
