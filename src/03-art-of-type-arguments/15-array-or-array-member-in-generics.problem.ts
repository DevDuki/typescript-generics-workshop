import { Equal, Expect } from "../helpers/type-utils";

/**
 * Here we see again that as a rule of thumb, it is again better to go lower with our type arguments. So instead of using "Array<string>" as
 * extends to that type argument, we only use string and then in the function argument we represent it as an array. Now funnily enough, if
 * we remove the "extends string" from the type argument, we get a more general return type of 'string[]' instead of 'Array<"INFO" |
 * "DEBUG" | ...'. So we see again, like in the previous explainers, that if we further restrict the type argument, only then will the
 * typescript compiler infer a more specific return type.
 * @param statuses
 */
const makeStatus = <TStatus extends string>(statuses: TStatus[]) => {
  return statuses;
};

const statuses = makeStatus(["INFO", "DEBUG", "ERROR", "WARNING"]);

type tests = [
  Expect<Equal<typeof statuses, Array<"INFO" | "DEBUG" | "ERROR" | "WARNING">>>,
];
