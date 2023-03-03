import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

/**
 * This example demonstrates that the generic type arguments are linked to each function call. So for instance:
 *
 * export const curryFunction =
 * <T, U, V>(t: T) =>
 *   (u: U) =>
 *   (v: V) => { ... }
 *
 * Wouldn't work, because the type arguments U and V are linked to the first function call, and thus cannot refer anything there, which
 * makes them unknown.
 */
export const curryFunction =
  <T>(t: T) =>
  <U >(u: U) =>
  <V>(v: V) => {
    return {
      t,
      u,
      v,
    };
  };

it("Should return an object which matches the types of each input", () => {
  const result = curryFunction(1)(2)(3);

  expect(result).toEqual({
    t: 1,
    u: 2,
    v: 3,
  });

  type test = [
    Expect<Equal<typeof result, { t: number; u: number; v: number }>>,
  ];
});
