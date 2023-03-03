import { expect, it, describe } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

/**
 * So there are actually 3 solutions to this problem. 2 of which are from the course and 1 which is my own.
 *
 * So let's start with my own solution.
 */
type RawConfig = {
  rawConfig: {
    featureFlags: {
      homePage: {
        showBanner: boolean;
        showLogOut: boolean;
      }
    }
  }
}

/**
 * So what I thought was that we could use the `RawConfig` type to extend the generic type `TConfig`, so that we at least capture the nested
 * properties that are being accessed in the function. So now inside the function we don't get the errors anymore that these properties
 * do not exist. But now we want the pass callback function called `override` to be able to return just the homePage flags. So what I
 * thought would be perfect, is to again use a type argument on `override` and then assign it to the parameter and the return type.
 */
export const getHomePageFeatureFlags = <TConfig extends RawConfig>(
  config: TConfig,
  override: <TFlags>(flags: TFlags) => TFlags
) => {
  return override(config.rawConfig.featureFlags.homePage);
};

/**
 * My solution might seem pretty clear and straight forward, but there is an uglier and a more elegant solution, which came from the course.
 * So lets look at the ugly solution first.
 *
 * So what this solution basically does is that instead of creating a new type argument for the `override` function, it just uses the
 * TConfig and indexes all the way to the homePage flags. So now we can use the `override` function to return just the homePage flags.
 * But that is pretty ugly, because we have to do this twice. Once in the function signature and once as the return type.
 */
export const getHomePageFeatureFlagsUgly = <TConfig extends RawConfig>(
  config: TConfig,
  override: (flags: TConfig['rawConfig']['featureFlags']['homePage']) => TConfig['rawConfig']['featureFlags']['homePage']
) => {
  return override(config.rawConfig.featureFlags.homePage);
};

/**
 * Now to the elegant solution.
 * What we do here, is we instead of providing the WHOLE `RawConfig`, we only focus on the desired homePage flags. We instead drill down
 * towards the homePage flags at the `config` argument and then assign the value of the homePage property to the `HomePageFlags` type.
 *
 * So the advantages of this solution, is that the type argument, really only focuses on the properties we are interested in.
 *
 * I prefer this and my solution. My solution may have some unnecessary properties in the type argument, but it is still pretty clear
 * what we try to achieve there. Maybe it is discouraged to use extra argument types, which in this case this solution is probably
 * better, but I don't like the drilling down in the type level, when we already have to do that in the value level anyway.
 */
export const getHomePageFeatureFlagsElegant = <HomePageFlags>(
  config: {
    rawConfig: {
      featureFlags: {
        homePage: HomePageFlags;
      }
    }
  },
  override: (flags: HomePageFlags) => HomePageFlags
) => {
  return override(config.rawConfig.featureFlags.homePage);
}

describe("getHomePageFeatureFlags", () => {
  const EXAMPLE_CONFIG = {
    apiEndpoint: "https://api.example.com",
    apiVersion: "v1",
    apiKey: "1234567890",
    rawConfig: {
      featureFlags: {
        homePage: {
          showBanner: true,
          showLogOut: false,
        },
        loginPage: {
          showCaptcha: true,
          showConfirmPassword: false,
        },
      },
    },
  };
  it("Should return the homePage flag object", () => {
    const flags = getHomePageFeatureFlags(
      EXAMPLE_CONFIG,
      (defaultFlags) => defaultFlags
    );

    expect(flags).toEqual({
      showBanner: true,
      showLogOut: false,
    });

    type tests = [
      Expect<Equal<typeof flags, { showBanner: boolean; showLogOut: boolean }>>
    ];
  });

  it("Should allow you to modify the result", () => {
    const flags = getHomePageFeatureFlags(EXAMPLE_CONFIG, (defaultFlags) => ({
      ...defaultFlags,
      showBanner: false,
    }));

    expect(flags).toEqual({
      showBanner: false,
      showLogOut: false,
    });

    type tests = [
      Expect<Equal<typeof flags, { showBanner: boolean; showLogOut: boolean }>>
    ];
  });
});
