import { LuauLiteral } from "../../LuauAST/luauast";

export function makeLiteral(value: string | boolean | number | null): LuauLiteral {
    return { type: "Literal", value }
}
