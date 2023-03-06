import { it } from "vitest";

interface Events {
  click: {
    x: number;
    y: number;
  };
  focus: undefined;
}

/**
 * Nothing new here, except for what we have learned already, but interesting to see is the named tuple syntax in the conditional type
 * ("[ payload: Events[TEventKey]"). This makes the name of the argument called "payload", so when we call the function which triggers
 * the conditional to be that tuple, then you can access that tuple by using "payload" as the property name! Pretty cool!
 */
export const sendEvent = <TEventKey extends keyof Events>(event: TEventKey, ...args: Events[TEventKey] extends undefined ? [] : [payload: Events[TEventKey]]) => {
  // Send the event somewhere!
};

it("Should force you to pass a second argument when you choose an event with a payload", () => {
  // @ts-expect-error
  sendEvent("click");

  sendEvent("click", {
    // @ts-expect-error
    x: "oh dear",
  });

  sendEvent(
    "click",
    // @ts-expect-error
    {
      y: 1,
    }
  );

  sendEvent("click", {
    x: 1,
    y: 2,
  });
});

it("Should prevent you from passing a second argument when you choose an event without a payload", () => {
  sendEvent("focus");

  sendEvent(
    "focus",
    // @ts-expect-error
    {}
  );
});
