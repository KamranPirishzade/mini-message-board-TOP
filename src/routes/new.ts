import { Router } from "express";
import type { Request, Response } from "express";
import messages from "../db.ts";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.render("form");
});

router.post("/", (req: Request, res: Response) => {
  const { username, message } = req.body;
  messages.push({
    id: crypto.randomUUID(),
    user: username,
    text: message,
    added: new Date(),
  });
  res.redirect("/");
});

export default router;
