import ts from "typescript";
import * as LuauAST from "../LuauAST/index";
import { makeLiteral } from "./utils/makeliteral";

export function transformSourceFile(sf: ts.SourceFile): LuauAST.LuauBlock {
    const body: LuauAST.LuauNode[] = [];
    for (const statement of sf.statements) {
        const node = transformNode(statement);
        if (node) body.push(node);
    }
    return { type: "Block", statements: body };
}

export function transformNode(node: ts.Node): LuauAST.LuauNode | null {
    switch (node.kind) {
        case ts.SyntaxKind.VariableStatement:
            return transformVariable(node as ts.VariableStatement);
        default:
            return null;
    }
}

function transformVariable(node: ts.VariableStatement): LuauAST.LuauLocalDecleration {
    const declarartion = node.declarationList.declarations[0];
    const name = (declarartion.name as ts.Identifier).text;
    const init = declarartion.initializer ? transformNode(declarartion.initializer) : makeLiteral(null);
    return { type: "LocalDecleration", name, value: init };
}