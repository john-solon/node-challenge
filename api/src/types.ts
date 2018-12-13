export type ImportType = "word" | "pdf" | "wattpad" | "evernote";

export type ExportType = "epub" | "pdf";

export interface Processable {
  state: "pending" | "finished";
  createdAt: Date;
  updatedAt: Date;
};

export interface Import extends Processable {
  bookId: string;
  type: ImportType;
  url: string;
};

export interface Export extends Processable {
  bookId: string;
  type: ExportType;
};

export type State = {
  exports: Export[];
  imports: Import[];
};
