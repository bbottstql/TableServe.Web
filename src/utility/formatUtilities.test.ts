import { describe, expect, it } from "vitest";
import {
  formatPhoneNumber,
  getTextBackgroundByStatus,
  money,
} from "./formatUtilities";

describe("getTextBackgroundByStatus", () => {
  it("returns the secondary badge class for PLACED", () => {
    expect(getTextBackgroundByStatus("PLACED")).toBe("text-bg-secondary");
  });

  it("returns the warning badge class for PREPARING", () => {
    expect(getTextBackgroundByStatus("PREPARING")).toBe("text-bg-warning");
  });

  it("returns the info badge class for READY", () => {
    expect(getTextBackgroundByStatus("READY")).toBe("text-bg-info");
  });

  it("returns the success badge class for SERVED", () => {
    expect(getTextBackgroundByStatus("SERVED")).toBe("text-bg-success");
  });

  it("returns the danger badge class for CANCELLED", () => {
    expect(getTextBackgroundByStatus("CANCELLED")).toBe("text-bg-danger");
  });

  it("returns an empty string for an unknown status", () => {
    expect(getTextBackgroundByStatus("BANANA")).toBe("");
  });
});

describe("formatPhoneNumber", () => {
  it("returns undefined when no number is provided", () => {
    expect(formatPhoneNumber()).toBeUndefined();
    expect(formatPhoneNumber(undefined)).toBeUndefined();
    expect(formatPhoneNumber("")).toBeUndefined();
  });

  it("formats a ten-digit number as (###) ###-####", () => {
    expect(formatPhoneNumber("8005551234")).toBe("(800) 555-1234");
  });

  it("formats another valid number correctly", () => {
    expect(formatPhoneNumber("5005005000")).toBe("(500) 500-5000");
  });

//   it("formats an already-formatted phone number as a scrambled string", () => {
//     expect(formatPhoneNumber("(800) 555-1234")).toBe("(800) 555-1234");
//   });

  it("returns a malformed partial format for short input", () => {
    expect(formatPhoneNumber("1234567")).toBe("(123) 456-7");
    expect(formatPhoneNumber("123")).toBe("(123) -");
  });
});

describe("money", () => {
  it("formats a positive amount as USD currency", () => {
    expect(money(1234.56)).toBe("$1,234.56");
  });

  it("formats zero as $0.00", () => {
    expect(money(0)).toBe("$0.00");
  });

  it("formats a negative amount correctly", () => {
    expect(money(-42.5)).toBe("-$42.50");
  });
});
