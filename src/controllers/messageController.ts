import type { Request, Response } from "express";
import { body, matchedData, validationResult } from "express-validator";
import db from "../db/db.ts";

const validateMessage = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .bail()
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Username should only contain alphabet characters"),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .bail()
    .isLength({ max: 200 })
    .withMessage("Message must be at most 200 characters long"),
];

function getMessageForm(req: Request, res: Response) {
  res.render("form");
}

async function createMessage(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("form", {
      errors: errors.array(),
      values: req.body,
    });
  }

  const { username, message } = matchedData(req);
  await db.addMessage(username, message);

  res.redirect("/");
}

async function getMessageDetails(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(404).send("Message not found");
    return;
  }
  const message = await db.getMessageById(id);
  if (!message) {
    res.status(404).send("Message not found");
    return;
  }
  res.render("message", message);
}

export default {
  getMessageForm,
  getMessageDetails,
  validateMessage,
  createMessage,
};
