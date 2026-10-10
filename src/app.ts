import express from "express";
import dotenv from "dotenv";
import path from "path";
import type { Request, Response, NextFunction, Express } from "express";
import messages from "./db.ts";
import router from "./routes/new.ts";
import * as Sentry from "@sentry/node";

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

app.get(ROUTE_PATHS.main, (req: Request, res: Response) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

app.get(ROUTE_PATHS.message, (req: Request, res: Response) => {
  const message = messages.find((m) => m.id === req.params.id);
  if (!message) {
    res.status(404).send("Message not found");
    return;
  }
  res.render("message", message);
});

app.get("/debug-sentry", () => {
  throw new Error("My first Sentry error!");
});

app.use("/new", router);

Sentry.setupExpressErrorHandler(app);

// app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
//   res.status(500).send("Something went wrong");
// });

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`App is running on: http://localhost:${PORT}`);
});
