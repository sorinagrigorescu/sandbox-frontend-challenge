import { describe, expect, test } from "vitest";
import { $fetch } from "@nuxt/test-utils";
import { TGetDoggyResponse } from "~~/utils/types";
import { FetchError } from "ofetch";

describe("Server side tests", async () => {
  test("Get a random doggie that exists", async () => {
    const res: TGetDoggyResponse = await $fetch("/api/doggy");
    expect(res.owner).toBeTruthy();
    expect(res.name).toBeTruthy();
    expect(res.description).toBeTruthy();
    expect(res.imageUrl).toBeTruthy();
    expect(res.attributes).toBeTruthy();
  });

  test("Get an inexistent doggie", async () => {
    try {
      await $fetch("/api/doggy/6942069");
      expect(false).toBe(true);
    } catch (error) {
      expect(error).toBeInstanceOf(FetchError);
      expect((error as FetchError).statusCode).toBe(404);
    }
  });
});
