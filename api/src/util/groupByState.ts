import { Processable } from "../types";

export function groupByState(acc: {[state: string]: Processable[]}, p: Processable) {
  if (acc[p.state]) {
    acc[p.state].push(p);
  } else {
    acc[p.state] = [p];
  }
  return acc;
}