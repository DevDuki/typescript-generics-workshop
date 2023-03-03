type Person = {
  name: string;
  age: number;
  birthdate: Date;
};

/**
 * This exercise demonstrates how typescript does not trust our generic type anymore when we use a condition inside the generic function.
 * As a rule of thumb, when you have a condition inside your generic function, you are probably going to need to use the "as" keyword to
 * tell typescript that this is fine. The reason for this is shown below.
 */
export function remapPerson<Key extends keyof Person>(
  key: Key,
  value: Person[Key],
) {
  if (key === "birthdate") {
    return new Date() as Person[Key];
  }

  return value;
}

/**
 * Because in a generic function, we as the user of that function could theoretically pass in any type in the generic type argument
 * (although it is not meant to be done). As shown below. So now for the second argument you can see that we can add either number or
 * date, which means I could theoretically pass a date for the Person's name.
 *
 * That is why Typescript cannot trust 100% that what we get after the condition, will still match the required type. So it will convert
 * anything that we return inside a condition to "never".
 */
remapPerson<"name" | "birthdate">("name", new Date());
