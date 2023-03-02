import { Equal, Expect } from "../helpers/type-utils";

/**
 * Here we can see that we can use generics without having a parameter on the function itself. This means that if you call the function
 * you must pass a type argument, in order to use it, just as if the function itself had parameters.
 */
export const createSet = <T>() => {
  return new Set<T>();
};

const stringSet = createSet<string>();
const numberSet = createSet<number>();
const unknownSet = createSet();

type tests = [
  Expect<Equal<typeof stringSet, Set<string>>>,
  Expect<Equal<typeof numberSet, Set<number>>>,
  Expect<Equal<typeof unknownSet, Set<unknown>>>,
];
