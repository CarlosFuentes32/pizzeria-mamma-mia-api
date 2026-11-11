import cors from "cors";
import { randomBytes } from "node:crypto";
import "dotenv/config";
import express from "express";

import authRoute from "./routes/auth.route.js";
import checkoutRoute from "./routes/checkout.route.js";
import pizzaRoute from "./routes/pizza.route.js";

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = randomBytes(32).toString("hex");
  console.warn(
    "JWT_SECRET is not configured; using an ephemeral secret for this process.",
  );
}

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/pizzas", pizzaRoute);
app.use("/api/checkouts", checkoutRoute);
app.use((_, res) => {
  res.status(404).json({ error: "Not Found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
