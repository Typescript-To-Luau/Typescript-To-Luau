import ts from "typescript";
import { transformSourceFile } from "../src/TSTransformer/transformer";
import { LuauLiteral, LuauLocalDecleration } from "../src/LuauAST";

describe("Transform Nodes", () => {
    test("Transform VariableStatement", () => {
        const tsFile = ts.createSourceFile(
            "test.ts",
            "const myVar = 5",
            ts.ScriptTarget.Latest,
            true,
        )

        const result = transformSourceFile(tsFile);
        
        const stmt = result.statements[0] as LuauLocalDecleration;
        expect(stmt.value).not.toBeNull();
        if (stmt.value) {
            const valueNode = stmt.value as LuauLiteral;
            expect(valueNode.type).toBe("Literal");
            expect(valueNode.value).toBe(5);
        }
        expect(stmt.type).toBe("LocalDecleration");
        expect(stmt.name).toBe("myVar");
    })
})