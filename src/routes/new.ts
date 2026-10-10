import { Router } from "express";
import type { Request, Response } from "express";
import messageController from "../controllers/messageController.ts";

const router = Router();

router.get("/", messageController.getMessageForm);

router.post(
  "/",
  messageController.validateMessage,
  messageController.createMessage,
);

export default router;
