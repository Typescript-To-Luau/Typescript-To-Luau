import { makeLiteral } from "../src/TSTransformer/utils/makeliteral";

describe("Make a Literal", () => {
    test("should create a literal object", () => {
        expect(makeLiteral("Text")).toEqual({ type: "Literal", value: "Text" });
    });
})