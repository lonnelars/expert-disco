import { padLeft } from "../src/padLeft";
import "mocha";
import * as assert from "assert";

describe("padLeft", () => {
  it("should pad a string", () => {
    assert.equal(padLeft("hello", "    "), "    hello");
  });
});
