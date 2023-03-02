import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

/**
 * Here we can see that we can also use multiple generics
 * Note! that here the return types are not as specific as before, when we used a single generic type. Notice in the test below how
 * a: "a" has become a: string and b: 1 has become b: number. If you wish to get more specific return types, then you can do so by being
 * more restrictive to the generic types. For example <T1 extends string, T2 extends number>.
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
