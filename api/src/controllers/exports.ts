import { Response, Request } from "express";
import { validationResult } from "express-validator/check";
import { Export } from "../types";

export const list = (req: Request, res: Response) => {
  res.status(200).json(req.store.allExport());
};

export const create = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const ex: Export = {
    bookId: req.body.bookId,
    type: req.body.type,
    state: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  req.store.saveExport(ex);
  res.status(201).json(ex);
};