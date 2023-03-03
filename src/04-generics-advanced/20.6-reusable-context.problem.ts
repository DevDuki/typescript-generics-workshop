import { CSSProperties } from "react";

/**
 * In this implementation, we need to specify the theme
 * inside useStyled wherever we use it. This is not ideal.
 *
 * See if you can refactor useStyled into a function called
 * makeUseStyled which returns a useStyled function, typed
 * with the theme.
 *
 * Desired API:
 *
 * const useStyled = makeUseStyled<MyTheme>();
 */

/**
 * Here we wrapped the function into a new "identity" function, which takes the type argument from before, but then uses that argument
 * in the returning function's argument. So now when the user of this function, wants to create a themed useStyled function, they only
 * have to pass the theme once when they create it and can then reuse the returned function with that theme, without needing to pass it
 * to the generic argument again.
 */
const makeUseStyled =
  <TTheme = {}>() =>
  (func: (theme: TTheme) => CSSProperties) => {
    // Imagine that this function hooks into a global theme
    // and returns the CSSProperties
    return {} as CSSProperties;
  };

const useStyled = makeUseStyled<MyTheme>();

interface MyTheme {
  color: {
    primary: string;
  };
  fontSize: {
    small: string;
  };
}

const buttonStyle = useStyled((theme) => ({
  color: theme.color.primary,
  fontSize: theme.fontSize.small,
}));

const divStyle = useStyled((theme) => ({
  backgroundColor: theme.color.primary,
}));
