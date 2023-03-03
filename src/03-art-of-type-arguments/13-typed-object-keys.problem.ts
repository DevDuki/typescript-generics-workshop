import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

/**
 * There are two possible solutions to this problem - and it's
 * to do with the way you specify the generic. Can you get
 * both solutions?
 */

/**
 * Solution 1:
 * In the first solution we are using the whole object that is passed in and access its keys to use it as return type.
 */
const typedObjectKeys2 = <TObject extends {}>(obj: TObject) => {
  return Object.keys(obj) as Array<keyof TObject>;
};

/**
 * Solution 2:
 * We almost had the second solution, which means we were on a good way, but we struggled with typescript's error that "this type cannot
 * be used a key, because it does not match the types 'string' | 'number' | 'symbol'". So we had to EXTEND the type argument with string
 * first! If we had done that before we would have had this solution.
 *
 * This is the preferred solution, because the type argument is again only referring to the thing that we really care about. Same as in
 * the before exercise, we wanted to be as specific with our type argument as possible. So since we only care about the keys of the
 * object, we extend it as a string and then use it as the key type in Record.
 */
const typedObjectKeys = <TKey extends string>(obj: Record<TKey, any>) => {
  return Object.keys(obj) as Array<TKey>;
}

it("Should return the keys of the object", () => {
  const result1 = typedObjectKeys({
    a: 1,
    b: 2,
  });

  expect(result1).toEqual(["a", "b"]);

  type test = Expect<Equal<typeof result1, Array<"a" | "b">>>;
});
