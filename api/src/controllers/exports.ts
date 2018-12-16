import { Response, Request } from "express";
import { validationResult } from "express-validator/check";
import { Export } from "../types";
import { groupByState } from "../util/groupByState";

export const list = (req: Request, res: Response) => {
  const exports = req.store.allExport().reduce(groupByState, {});

  res.status(200).json(exports);
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