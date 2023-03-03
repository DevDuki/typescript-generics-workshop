import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

/**
 * This time, let's try and solve this one
 * with function overloads too!
 */

/**
 * In this example we can see, that the signature of the implementation function (sort of the original one in the bottom) has no weight,
 * because if we were to remove the first overload and tried to call the function with "hello", we would get an error. Because the
 * implementation function is basically like a rule book, for the overload functions. We even have to be more specific in the
 * implementation function, because if we for example do not declare a return type in the implementation function. We could basically
 * say 'return "blablabla"' and typescript would not complain, even tho the overload functions expect a return of "hello" or "goodbye".
 * That's because they do not look that carefully at the implementation. So you have to be more careful and more specific with the
 * implementation function and say that we will only return "hello" or "goodbye".
 */
function youSayGoodbyeISayHello(greeting: "hello"): "goodbye";
function youSayGoodbyeISayHello(greeting: "goodbye"): "hello";
function youSayGoodbyeISayHello(greeting: "goodbye" | "hello"): "hello" | "goodbye" {
  return greeting === "goodbye" ? "hello" : "goodbye";
}

/**
 * As a reminder of how we solved this problem before with generics and conditional types.
 */
export const youSayGoodbyeISayHelloWithGeneric = <T extends "hello" | "goodbye">(greeting: T) => {
  return (greeting === "goodbye" ? "hello" : "goodbye") as T extends "hello" ? "goodbye" : "hello"
};

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
