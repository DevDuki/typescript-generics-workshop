import { Equal, Expect } from "../helpers/type-utils";

/**
 * Because typescript cannot infer TSource and then immediately use it as a type for a second type argument, like TSelectors, we have
 * to use the same pattern as in the previous exercise, and wrap it in an identity function. That identity function will then take care
 * of TSource, which gets inferred as soon as the user calls that function, and once the user calls the returned function, with the
 * selectors. They will have the correct TSource type inferred.
 */
export const makeSelectors =
  <TSource> () =>
  <TSelectors extends Record<string, (source: TSource) => any> = {}>(
    selectors: TSelectors,
  ) => {
    return selectors;
  };

interface Source {
  firstName: string;
  middleName: string;
  lastName: string;
}

/**
 * We've got a problem here. We want to be able to infer the type
 * of the selectors object from what we passed in to makeSelectors.
 *
 * But we can't. As soon as we pass ONE type argument, inference
 * doesn't work on the other type arguments. We want to refactor this
 * so that we can infer the type of the selectors object.
 *
 * Desired API:
 *
 * makeSelectors<Source>()({ ...selectorsGoHere })
 */
const selectors = makeSelectors<Source>()({
  getFullName: (source) =>
    `${source.firstName} ${source.middleName} ${source.lastName}`,
  getFirstAndLastName: (source) => `${source.firstName} ${source.lastName}`,
  getFirstNameLength: (source) => source.firstName.length,
});

type tests = [
  Expect<Equal<typeof selectors["getFullName"], (source: Source) => string>>,
  Expect<
    Equal<typeof selectors["getFirstAndLastName"], (source: Source) => string>
  >,
  Expect<
    Equal<typeof selectors["getFirstNameLength"], (source: Source) => number>
  >,
];
