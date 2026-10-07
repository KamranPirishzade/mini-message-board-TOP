import { Router } from "express";
import type { Request, Response } from "express";
import messages from "../db.ts";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.render("form");
});

router.post("/", (req: Request, res: Response) => {
  const username = req.body.username?.trim();
  const message = req.body.message?.trim();

  if (!username || !message) {
    res.status(400).send("Username and message are required");
    return;
  }

  messages.push({
    id: crypto.randomUUID(),
    user: username,
    text: message,
    added: new Date(),
  });
  res.redirect("/");
});

export default router;
