import { Processable, Import, Export, ExportType } from "./types";
import Store from "./store";

interface ExportConfig {
  [key: string]: number
}

const exportConfig: ExportConfig = {
  "epub": 10000,
  "pdf": 25000
}

const impportConfig = 60000;

function onlyPending(p: Processable) {
  return p.state === 'pending'
}

function overdue(p: Processable) {
  let max: number;
  if ('url' in p) {
    max = impportConfig
  } else {
    max = exportConfig[(p as Export).type]
  }

  return new Date().getTime() - p.createdAt.getTime() > max;
}

function update(p: Processable) {
  p.updatedAt = new Date();
  p.state = "finished";
}

export function processImport(store: Store) {
  store.allImport().filter(onlyPending).filter(overdue).forEach(update);
}

export function processExport(store: Store) {
  store.allExport().filter(onlyPending).filter(overdue).forEach(update);
}