import { Processable, Import, Export, ExportType } from "./types";
import Store from "./store";

interface ExportConfig {
  [key: string]: number
}

const exportConfig: ExportConfig = {
  "epub": 10,
  "pdf": 25
}

const impportConfig = 60;

function onlyPending(p: Processable) {
  p.state === 'pending'
}

function overdue(p: Processable) {
  let max: number;
  if ('url' in p) {
    max = impportConfig
  } else {
    max = exportConfig[(p as Export).type]
  }
  p.createdAt.getTime() - new Date().getTime() > max;
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