import { Equal, Expect } from "../helpers/type-utils";

const obj = {
  a: 1,
  b: 2,
  c: 3,
} as const;

type ObjKey = keyof typeof obj;

/**
 * Here we refactored an arrow function into a function overload where we wanted to get rid of typescript's weird error message of
 * "could be instantiated with a subtype of blablabla". This is because we were using a type argument, but then tried to give it a
 * default value, which can actually be overridden by the function consumer, if they paas in a different type argument. So a solution
 * for that is this construct below.
 */
function getObjValue(): typeof obj["a"];
function getObjValue<TKey extends ObjKey>(key: TKey): typeof obj[TKey];
function getObjValue(key: ObjKey = "a") {
  return obj[key];
}

const one = getObjValue("a");
const oneByDefault = getObjValue();
const two = getObjValue("b");
const three = getObjValue("c");

type tests = [
  Expect<Equal<typeof one, 1>>,
  Expect<Equal<typeof oneByDefault, 1>>,
  Expect<Equal<typeof two, 2>>,
  Expect<Equal<typeof three, 3>>
];
