import type { Request, Response } from "express";
import { body, matchedData, validationResult } from "express-validator";

const validateMessage = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Username should only contain alphabet characters"),
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ max: 200 })
    .withMessage("Message must be at most 200 characters long"),
];

function createMessage(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("form", {
      errors: errors.array(),
      values: req.body,
    });
  }

  const { username, message } = matchedData(req);

  const newMessage = {
    id: crypto.randomUUID(),
    user: username,
    text: message,
    added: new Date(),
  };

  res.redirect("/");
}

function getMessageDetails(req: Request, res: Response) {
  const message = messages.find((m) => m.id === req.params.id);
  if (!message) {
    res.status(404).send("Message not found");
    return;
  }
  res.render("message", message);
}

export default {
  getMessageDetails,
  validateMessage,
  createMessage,
};
