import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

/**
 * Here we again have 2 solutions.
 *
 * Solution 1:
 * The first solution I came up with, is also the first solution presented in the video. We use 2 type arguments, to kind of represent
 * exactly what we are looking for. In our case we are looking for the result of the passed "func" function and the arguments that are
 * passed to it. So we use 2 type arguments to represent that.
 */
const makeSafe = <TResult, TArgs extends Array<any>>(func: (...args: TArgs) => TResult) => (...args: TArgs):
    | {
        type: "success";
        result: TResult;
      }
    | {
        type: "failure";
        error: Error;
      } => {
    try {
      const result = func(...args);

      return {
        type: "success",
        result,
      };
    } catch (e) {
      return {
        type: "failure",
        error: e as Error,
      };
    }
  };

/**
 * Solution 2:
 * For the second solution we grab the whole passed in function in the type argument and use the utility types "Parameters" and "ReturnType"
 * to get the desired types. This looks pretty cool, but then again, what do you prefer? A more explicit type argument or a more generic one?
 * So this is completely up to you. In this case I personally prefer the second solution, because when you hover over the returned
 * function when u use this makeSafe2, you can see the whole function that gets typed in the type argument. So it's also easier to
 * understand what we are actually representing with the type argument.
 */
const makeSafe2 = <TFunc extends (...args: any[]) => any>(func: TFunc) => (...args: Parameters<TFunc>):
    | {
        type: "success";
        result: ReturnType<TFunc>;
      }
    | {
        type: "failure";
        error: Error;
      } => {
    try {
      const result = func(...args);

      return {
        type: "success",
        result,
      };
    }
    catch (e) {
      return {
        type: "failure",
        error: e as Error,
      };
    }
  };

it("Should return the result with a { type: 'success' } on a successful call", () => {
  const func = makeSafe(() => 1);

  const result = func();

  expect(result).toEqual({
    type: "success",
    result: 1,
  });

  type tests = [
    Expect<
      Equal<
        typeof result,
        | {
            type: "success";
            result: number;
          }
        | {
            type: "failure";
            error: Error;
          }
      >
    >,
  ];
});

it("Should return the error on a thrown call", () => {
  const func = makeSafe(() => {
    if (1 > 2) {
      return "123";
    }
    throw new Error("Oh dear");
  });

  const result = func();

  expect(result).toEqual({
    type: "failure",
    error: new Error("Oh dear"),
  });

  type tests = [
    Expect<
      Equal<
        typeof result,
        | {
            type: "success";
            result: string;
          }
        | {
            type: "failure";
            error: Error;
          }
      >
    >,
  ];
});

it("Should properly match the function's arguments", () => {
  const func = makeSafe((a: number, b: string) => {
    return `${a} ${b}`;
  });

  // @ts-expect-error
  func();

  // @ts-expect-error
  func(1, 1);

  func(1, "1");
});
