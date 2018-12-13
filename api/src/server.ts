import logger from "./util/logger";
import { app, store } from "./app";
import Store from "./store";
import { processExport, processImport } from "./processor";

setInterval(() => {
  logger.info("Processing Export");
  processExport(store);
  logger.info("Processing Import");
  processImport(store);
}, 1000);

const server = app.listen(app.get("port"), () => {
  logger.info("App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
  logger.info("Press CTRL-C to stop\n");
});

export default server;
