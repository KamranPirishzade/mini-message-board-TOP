import express from "express";
import dotenv from "dotenv";
import path from "path";

const rootDir = path.join(import.meta.dirname, "..");

dotenv.config({ path: path.join(rootDir, ".env") });

const app = express();

app.set("views", path.join(rootDir, "views"));
app.set("view engine", "ejs");

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`App is running on: http://localhost:${PORT}`);
});
