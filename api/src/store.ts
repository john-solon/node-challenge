import { State, Import, Export } from "./types";

const DEFAULT_STATE: State = {
  imports: [],
  exports: []
};

class Store {
  constructor(private state: State = DEFAULT_STATE) {
  }

  saveImport(im: Import) {
    this.state.imports.push(im);
  }

  allImport() {
    return this.state.imports;
  }

  saveExport(ex: Export) {
    this.state.exports.push(ex);
  }

  allExport() {
    return this.state.exports;
  }
}

export default Store;