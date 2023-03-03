import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

/**
 * In this exercise we are only demonstrating, that we should always keep our eyes open for useless type arguments. Like here we had 2
 * type arguments for each property "a" and "b", but we could have just used 1 type argument for both properties and then access each of
 * them individually. I personally would have preferred the 2 type arguments, because it is less boilerplate-y, and it's faster to
 * understand, what we were trying to do.
 */
const returnBothOfWhatIPassIn = <T1 extends { a: any, b: any }>(params: T1): [T1['a'], T1['b']] => {
  return [params.a, params.b];
};

it("Should return a tuple of the properties a and b", () => {
  const result = returnBothOfWhatIPassIn({
    a: "a",
    b: 1,
  });

  expect(result).toEqual(["a", 1]);

  type test1 = Expect<Equal<typeof result, [string, number]>>;
});
