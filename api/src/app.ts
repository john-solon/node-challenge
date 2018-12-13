import express from "express";
import errorHandler from "errorhandler";
import compression from "compression";
import bodyParser from "body-parser";
import lusca from "lusca";
import expressValidator from "express-validator";
import { check, body } from "express-validator/check";

import Store from "./store";
import { isProd } from "./util/env";
import * as exportsController from "./controllers/exports";
import * as importsController from "./controllers/imports";

declare global {
  namespace Express {
    interface Request {
      store: Store;
    }
  }
}

const app = express();

const store = new Store();

app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use(function(req, res, next){
  req.store = store;
  next()
})

if (!isProd) {
  app.use(errorHandler());
}

app.get("/api/imports",importsController.list);
app.post(
  "/api/imports",
  [check('url').isURL().not().isEmpty(),
   check('bookId').not().isEmpty(),
   check('type').isIn(["word", "pdf", "wattpad", "evernote"])],
  importsController.create
);

app.get("/api/exports", exportsController.list);
app.post(
  "/api/exports",
  [check('bookId').not().isEmpty(),
   check('type').isIn(["epub", "pdf"])],
  exportsController.create);

export {app, store};