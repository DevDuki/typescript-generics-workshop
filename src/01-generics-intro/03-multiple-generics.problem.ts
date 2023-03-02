import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

/**
 * Here we can see that we can also use multiple generics
 */
const returnBothOfWhatIPassIn = <T1, T2>(a: T1, b: T2) => {
  return {
    a,
    b,
  };
};

it("Should return an object of the arguments you pass", () => {
  const result = returnBothOfWhatIPassIn("a", 1);

  expect(result).toEqual({
    a: "a",
    b: 1,
  });

  type test1 = Expect<
    Equal<
      typeof result,
      {
        a: string;
        b: number;
      }
    >
  >;
});
