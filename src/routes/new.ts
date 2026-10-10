import { Router } from "express";
import type { Request, Response } from "express";
import messages from "../db.ts";
import messageController from "../controllers/messageController.ts";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.render("form");
});

router.post(
  "/",
  messageController.validateMessage,
  messageController.createMessage,
);

export default router;
