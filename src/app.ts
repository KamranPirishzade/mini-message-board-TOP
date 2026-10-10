import express from "express";
import dotenv from "dotenv";
import path from "path";
import type { Request, Response, NextFunction, Express } from "express";
import router from "./routes/new.ts";
import * as Sentry from "@sentry/node";
import messageController from "./controllers/messageController.ts";
import db from "./db/db.ts";

const rootDir = path.join(import.meta.dirname, "..");

dotenv.config({ path: path.join(rootDir, ".env") });

const ROUTE_PATHS = {
  main: "/",
  new: "/new",
  message: "/message/:id",
};

const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, "public")));
app.set("views", path.join(rootDir, "views"));
app.set("view engine", "ejs");

app.get(ROUTE_PATHS.main, async (req: Request, res: Response) => {
  const messages = await db.getAllMessages();
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

app.get(ROUTE_PATHS.message, messageController.getMessageDetails);

app.use(ROUTE_PATHS.new, router);

app.get("/debug-sentry", () => {
  throw new Error("My first Sentry error!");
});

Sentry.setupExpressErrorHandler(app);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send("Something went wrong");
});

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`App is running on: http://localhost:${PORT}`);
});
