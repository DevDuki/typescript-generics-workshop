import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

/**
 * Here we pass our generic function to a more real world use case, to stomp down the "any" type coming from "fetch"
 */
const fetchData = async <TData>(url: string) => {
  const data = await fetch(url).then<TData>((response) => response.json());
  return data;
};

it("Should fetch data from an API", async () => {
  const data = await fetchData<{ name: string }>(
    "https://swapi.dev/api/people/1",
  );
  expect(data.name).toEqual("Luke Skywalker");

  type tests = [Expect<Equal<typeof data, { name: string }>>];
});
