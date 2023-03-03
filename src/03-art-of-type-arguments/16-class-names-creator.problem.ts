import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

/**
 * As recently we have 2 solutions again. So let's look at the first one first.
 *
 * Solution 1:
 * Here we use our rule of thumb and try to go as low/deep as possible with our type argument. So here we say that our type argument
 * "ClassName" extends a string, because we only care about the "keys" of the classes object, which are indeed type of string. So we
 * then assign the argument "classes" of our function the type of Record<ClassName, string>, which means that the keys of the object, as
 * mentioned before, are kinda "saved" in our type argument "ClassName". We can then assign this type to the argument "type" of our
 * callback function and that's it! We got autocompletion and type safety for our "type" argument!
 */
const createClassNamesFactory =
  <ClassName extends string>(classes: Record<ClassName, string>) =>
  (type: ClassName, ...otherClasses: string[]) => {
    const classList = [classes[type], ...otherClasses];
    return classList.join(" ");
  };

/**
 * Solution 2:
 * So here is a solution, where we sort of try to go higher with our type argument. So we say that our type argument "TClasses" extends
 * a Record<string, string>. We then assign this to the "classes" function argument, and then we use the "keyof" operator to get the keys
 * of TClasses. We then assign this to the "type" argument of our callback function. So we are going lower later on in the code instead.
 */
const createClassNamesFactory2 =
  <TClasses extends Record<string, string>>(classes: TClasses) =>
  (type: keyof TClasses, ...otherClasses: string[]) => {
    const classList = [classes[type], ...otherClasses];
    return classList.join(" ");
  };

const getBg = createClassNamesFactory({
  primary: "bg-blue-500",
  secondary: "bg-gray-500",
});

it("Should let you create classes from a className factory", () => {
  expect(getBg("primary")).toEqual("bg-blue-500");
  expect(getBg("secondary")).toEqual("bg-gray-500");
});

it("Should let you pass additional classes which get appended", () => {
  expect(getBg("primary", "text-white", "rounded", "p-4")).toEqual(
    "bg-blue-500 text-white rounded p-4"
  );
});

it("Should return a type of string", () => {
  const result = getBg("primary");

  type test = Expect<Equal<typeof result, string>>;
});

it("Should not let you pass invalid variants", () => {
  // @ts-expect-error
  getBg("123123");
});

it("Should not let you pass an invalid object to createClassNamesFactory", () => {
  // @ts-expect-error
  createClassNamesFactory([]);

  // @ts-expect-error
  createClassNamesFactory(123);

  createClassNamesFactory({
    // @ts-expect-error
    a: 1,
  });
});
