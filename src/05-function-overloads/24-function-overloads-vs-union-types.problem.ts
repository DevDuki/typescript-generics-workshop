import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

/**
 * In this exercise we discussed, whether a function overload is required here or not. We came to the conclusion that it is not
 * required, because the return type for each function overload is the same. So instead we could just keep the implementation as is and
 * use a union type in the parameter.
 */
function runGenerator(generator: () => string): string;
function runGenerator(generator: { run: () => string}): string;
function runGenerator(generator: { run: () => string } | (() => string)): string {
  if (typeof generator === "function") {
    return generator();
  }
  return generator.run();
}

/**
 * On the other hand, if the return type would change, depending on the parameter, then we would prefer to use a function overload.
 * Because now whenever we call one of the overloaded function, our returned variable will have only one of the return types, instead of
 * the union.
 */
function runGenerator2(generator: () => string): string;
function runGenerator2(generator: { run: () => string}): { result: string };
function runGenerator2(generator: { run: () => string } | (() => string)): string | { result: string } {
  if (typeof generator === "function") {
    return generator();
  }
  return { result: generator.run() };
}

it("Should accept an object where the generator is a function", () => {
  const result = runGenerator({
    run: () => "hello",
  });

  expect(result).toBe("hello");

  type test1 = Expect<Equal<typeof result, string>>;
});

it("Should accept an object where the generator is a function", () => {
  const result = runGenerator(() => "hello");

  expect(result).toBe("hello");

  type test1 = Expect<Equal<typeof result, string>>;
});
