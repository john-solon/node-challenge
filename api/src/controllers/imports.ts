import { Response, Request } from "express";
import { validationResult } from "express-validator/check";
import { Import } from "../types";
import { groupByState } from "../util/groupByState";

export const list = (req: Request, res: Response) => {
  const imports = req.store.allImport().reduce(groupByState, {});

  res.status(200).json(imports);
};

export const create = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const im: Import = {
    bookId: req.body.bookId,
    url: req.body.url,
    type: req.body.type,
    state: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  req.store.saveImport(im);
  res.status(201).json(im);
};