import { describe, expect, it, vi } from "vitest";
import {
  BASE_URL,
  checkStatus,
  parseJSON,
  translateStatusToErrorMessage,
} from "./fetchUtilities";

describe("BASE_URL", () => {
  it("uses the expected API base URL", () => {
    expect(BASE_URL).toBe("http://localhost:5072/api");
  });
});

describe("translateStatusToErrorMessage", () => {
  it("asks the user to sign in again on 401", () => {
    expect(translateStatusToErrorMessage(401)).toBe("Please sign in again.");
  });

  it("reports a permissions problem on 403", () => {
    expect(translateStatusToErrorMessage(403)).toBe(
      "You do not have permission to view the data requested.",
    );
  });

  it("falls back to the generic message on 500", () => {
    expect(translateStatusToErrorMessage(500)).toBe(
      "There was an error saving or retrieving data.",
    );
  });

  it("falls back to the generic message on 404", () => {
    expect(translateStatusToErrorMessage(404)).toBe(
      "There was an error saving or retrieving data.",
    );
  });
});

describe("checkStatus", () => {
  it("returns the response unchanged when it's ok", async () => {
    const response = new Response("{}", { status: 200 });

    await expect(checkStatus(response)).resolves.toBe(response);
  });

  it("throws the generic message on 404", async () => {
    const response = new Response("Not found", {
      status: 404,
      statusText: "Not Found",
    });

    await expect(checkStatus(response)).rejects.toThrow(
      "There was an error saving or retrieving data.",
    );
  });

  it("throws the sign-in message on 401", async () => {
    const response = new Response("Unauthorized", {
      status: 401,
      statusText: "Unauthorized",
    });

    await expect(checkStatus(response)).rejects.toThrow(
      "Please sign in again.",
    );
  });

  it("logs the HTTP error details before throwing", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const response = new Response("Forbidden", {
      status: 403,
      statusText: "Forbidden",
    });

    await expect(checkStatus(response)).rejects.toThrow(
      "You do not have permission to view the data requested.",
    );
    expect(consoleSpy).toHaveBeenCalledTimes(1);

    consoleSpy.mockRestore();
  });
});

describe("parseJSON", () => {
  it("parses a JSON response body", async () => {
    const response = new Response(JSON.stringify({ id: 7, name: "Test" }));

    await expect(parseJSON(response)).resolves.toEqual({ id: 7, name: "Test" });
  });
});
