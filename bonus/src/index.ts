interface Step {
  move?: number;
  insert?: string;
  delete?: number;
}

export class Operation {
  public steps: Step[];

  constructor(steps: Step[]) {
    this.steps = steps;
  }

  public static combine(op1: Operation, op2: Operation) {
    const op1Move = op1.steps.find((step) => !!step.move).move;
    const op2Move = op2.steps.find((step) => !!step.move).move;

    let operation: Operation;
    if (op1Move < op2Move) {
      operation = new Operation([...op1.steps]);
      operation.combine(op2);
    } else {
      operation = new Operation([...op2.steps]);
      operation.combine(op1);
    }

    return operation;
  }

  public combine(operation: Operation) {
    const moveCount = this.getMoveCount();
    operation.steps.forEach((step) => {
      const newStep = {...step};
      if (newStep.move) {
        newStep.move -= moveCount;
      }
      this.steps.push(newStep);
    });
  }

  public apply(text: string): string {
    let current = 0;
    this.steps.forEach((step) => {
      if (step.move) {
        current += step.move
      } else if (step.delete) {
        text = text.substring(0, current) + text.substring(current + step.delete);  
      } else if (step.insert) {
        text = text.substring(0, current) + step.insert + text.substring(current);
        current += step.insert.length;
      }
    });

    return text;
  }

  private getMoveCount() {
    return this.steps.filter((step) => step.move)
                     .map((step) => step.move)
                     .reduce((sum: number, move) => sum + move);
  }
}