import { Equal, Expect } from "../helpers/type-utils";

/**
 * Here we basically create a kind of type function AROUND an actual function, to infer the return type.
 *
 * Kind of like this:
 * type ReturnWhatIPassIn<T> = T
 */
const returnWhatIPassIn = <T>(param: T) => {
  return param;
};

const one = returnWhatIPassIn(1);
const matt = returnWhatIPassIn("matt");

type tests = [Expect<Equal<typeof one, 1>>, Expect<Equal<typeof matt, "matt">>];
