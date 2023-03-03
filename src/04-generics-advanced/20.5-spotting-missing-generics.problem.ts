import { Equal, Expect } from "../helpers/type-utils";

/**
 * Here we see that we had a missing type argument, because we weren't receiving the return type that we expected. Thus, we had to infer
 * the key of the passed object explicitly, so that we know exactly when this function is being called, which key we are dealing here
 * with, so we can return exactly the matching type of the value of that key.
 */
const getValue = <TObj, TKey extends keyof TObj>(obj: TObj, key: TKey) => {
  return obj[key];
};

const obj = {
  a: 1,
  b: "some-string",
  c: true,
};

const numberResult = getValue(obj, "a");
const stringResult = getValue(obj, "b");
const booleanResult = getValue(obj, "c");

type tests = [
  Expect<Equal<typeof numberResult, number>>,
  Expect<Equal<typeof stringResult, string>>,
  Expect<Equal<typeof booleanResult, boolean>>,
];

export {};
