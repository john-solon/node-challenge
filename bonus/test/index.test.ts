import { Operation } from "../src/index";

describe("single operation", () => {
  it("should apply all step one by one", () => {
    const s = "abcdefg";
    const op1 = new Operation([{ move: 1 }, { insert: "FOO" }]);
    const op2 = new Operation([{ move: 3 }, { insert: "BAR" }]);
    const op3 = new Operation([{ move: 3 }, { delete: 2 }]);
    expect(op1.apply(s)).toBe("aFOObcdefg")
    expect(op2.apply(s)).toBe("abcBARdefg")
    expect(op3.apply(s)).toBe("abcfg")
  });
});

describe("combine operation", () => {
  it("should be commutative", () => {
    const s = "abcdefg";
    const op1 = new Operation([{ move: 1 }, { insert: "FOO" }]);
    const op2 = new Operation([{ move: 3 }, { insert: "BAR" }]);
    const op3 = new Operation([{ move: 5 }, { delete: 2 }]);

    const combined1 = Operation.combine(op1, op2);
    expect(combined1.apply(s)).toBe("aFOObcBARdefg")
    
    const combined2 = Operation.combine(op2, op1);
    expect(combined2.apply(s)).toBe(combined1.apply(s));

    const combined3 = Operation.combine(op1, op3);
    expect(combined3.apply(s)).toBe("aFOObcde")

    const combined4 = Operation.combine(op3, op1);
    expect(combined4.apply(s)).toBe(combined3.apply(s));
  });
});