import { it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

/**
 * Here we constrain the generic type to only accept string. Again we can see some similarities with the previous workshop (type
 * transformations).
 *
 * So in the type level it would look like this!:
 * type ReturnWhatIPassIn<T extends string> = T
 */
export const returnWhatIPassIn = <T extends string>(t: T) => t;

it("Should ONLY allow strings to be passed in", () => {
  const a = returnWhatIPassIn("a");

  type test1 = Expect<Equal<typeof a, "a">>;

  // @ts-expect-error
  returnWhatIPassIn(1);

  // @ts-expect-error
  returnWhatIPassIn(true);

  // @ts-expect-error
  returnWhatIPassIn({
    foo: "bar",
  });
});
