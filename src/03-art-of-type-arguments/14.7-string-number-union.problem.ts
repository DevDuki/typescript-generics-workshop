import { Equal, Expect } from "../helpers/type-utils";

/**
 * Here we restrict the type of T to be a string or number, which makes the return type of "output" to be a literal type and not just a
 * string or number.
 */
export const inferItemLiteral = <T extends string | number>(t: T) => {
  return {
    output: t,
  };
};

const result1 = inferItemLiteral("a");
const result2 = inferItemLiteral(123);

type tests = [
  Expect<Equal<typeof result1, { output: "a" }>>,
  Expect<Equal<typeof result2, { output: 123 }>>
];

// @ts-expect-error
const error1 = inferItemLiteral({
  a: 1,
});

// @ts-expect-error
const error2 = inferItemLiteral([1, 2]);
