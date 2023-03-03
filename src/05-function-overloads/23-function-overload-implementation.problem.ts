import { it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

interface AnonymousPrivileges {
  sitesCanVisit: string[];
}

interface UserPrivileges extends AnonymousPrivileges {
  sitesCanEdit: string[];
}

interface AdminPrivileges extends UserPrivileges {
  sitesCanDelete: string[];
}

/**
 * Here we see an example again where the implementation is sort of the master of the function overloads. It kind of tells what's
 * everything possible in it and then the overload functions extract each possibility from it. Important to note here again is that the
 * implementation function is not visible externally!
 */
function getRolePrivileges(role: "admin"): AdminPrivileges;
function getRolePrivileges(role: "user"): UserPrivileges;
function getRolePrivileges(role: string): AnonymousPrivileges;
function getRolePrivileges(role: string): AnonymousPrivileges | UserPrivileges | AdminPrivileges {
  switch (role) {
    case "admin":
      return {
        sitesCanDelete: [],
        sitesCanEdit: [],
        sitesCanVisit: [],
      };
    case "user":
      return {
        sitesCanEdit: [],
        sitesCanVisit: [],
      };
    default:
      return {
        sitesCanVisit: [],
      };
  }
}

it("Should return the correct privileges", () => {
  const adminPrivileges = getRolePrivileges("admin");

  const userPrivileges = getRolePrivileges("user");
  const anonymousPrivileges = getRolePrivileges("anonymous");

  type tests = [
    Expect<Equal<typeof adminPrivileges, AdminPrivileges>>,
    Expect<Equal<typeof userPrivileges, UserPrivileges>>,
    Expect<Equal<typeof anonymousPrivileges, AnonymousPrivileges>>,
  ];
});
