import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

/**
 * Here we see that we can use a conditional type as a return type of a function, but we have to use the "as" keyword to tell typescript
 * that we are actually returning a conditional type. This is because the return type of a function is always a type, so we have to tell
 * typescript that we are actually returning a conditional type.
 */
function youSayGoodbyeISayHello<T extends "hello" | "goodbye">(greeting: T) {
  return (greeting === "goodbye" ? "hello" : "goodbye") as T extends "hello" ? "goodbye" : "hello";
}

it("Should return goodbye when hello is passed in", () => {
  const result = youSayGoodbyeISayHello("hello");

  type test = [Expect<Equal<typeof result, "goodbye">>];

  expect(result).toEqual("goodbye");
});

it("Should return hello when goodbye is passed in", () => {
  const result = youSayGoodbyeISayHello("goodbye");

  type test = [Expect<Equal<typeof result, "hello">>];

  expect(result).toEqual("hello");
});
