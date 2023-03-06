import { Equal, Expect } from "../helpers/type-utils";

const divElement = document.querySelector("div");
const spanElement = document.querySelector("span");

/**
 * Your challenge: figure out why divElement2 is NOT
 * of type HTMLDivElement.
 *
 * Yes the reason, why this querySelector function here, cannot determine the type of the element, is because, if we go to the
 * definition of this function, then we can see that there are 3 overloads for this function. And here we are using the third one,
 * unlike the above 2 which are using the first one. And as we can see on the first overload, the type parameter is mapped to a kind of
 * selection of HTML element tags, that are mapped to their types. So if a string matches one of these tags, then the type parameter
 * will infer it automatically, but since we have a string here, that contains more than just an element tag, then typescript isnt able
 * to match it to one of the mapped values, thus it makes us use the 3rd overload. And there the type parameter is just a generic type
 * of "Element". We can override this tho, by providing a type argument to the function call ourselves, like so:
 */
const divElement2 = document.querySelector<HTMLDivElement>("div.foo");

type tests = [
  Expect<Equal<typeof divElement, HTMLDivElement | null>>,
  Expect<Equal<typeof spanElement, HTMLSpanElement | null>>,
  Expect<Equal<typeof divElement2, HTMLDivElement | null>>
];
