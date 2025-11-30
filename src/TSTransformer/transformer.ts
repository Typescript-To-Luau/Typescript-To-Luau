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

/**
 * Transforms a TypeScript VariableStatement into a Luau local declaration AST node.
 *
 * This function:
 * - Uses the first declaration in node.declarationList.declarations[0].
 * - Extracts the declaration name via declaration.name.getText() and emits it as the
 *   Luau local variable name.
 * - Converts simple initializers into a Luau literal value when possible:
 *   - ts.NumericLiteral -> Luau literal number
 *   - ts.StringLiteral  -> Luau literal string
 *   - TrueKeyword       -> Luau literal true
 *   - FalseKeyword      -> Luau literal false
 * - If no recognizable initializer is present, the returned value field is null.
 *
 * Limitations / notes:
 * - Only the first declaration in the VariableStatement is handled; additional
 *   declarators are ignored.
 * - Destructured bindings, complex expressions, function calls, object/array
 *   literals, and other initializer kinds are not converted and will result
 *   in a null value.
 * - The function assumes a declaration exists at declarations[0]; calling it with
 *   an empty declaration list may cause runtime errors.
 * - The returned object conforms to LuauAST.LuauLocalDecleration and has the
 *   form: { type: "LocalDecleration", name: string, value: LuauLiteral | null }.
 *
 * @param node - The TypeScript VariableStatement to transform.
 * @returns A LuauAST.LuauLocalDecleration representing the transformed variable.
 */
function transformVariable(node: ts.VariableStatement): LuauAST.LuauLocalDecleration {
    const declarartion = node.declarationList.declarations[0];

    let value: LuauAST.LuauLiteral | null = null;

    if (declarartion.initializer) {
        if (ts.isNumericLiteral(declarartion.initializer)) {
            value = { type: "Literal", value: Number(declarartion.initializer.text) }
        } else if (ts.isStringLiteral(declarartion.initializer)) {
            value = { type: "Literal", value: declarartion.initializer.text }
        } else if (declarartion.initializer.kind == ts.SyntaxKind.TrueKeyword) {
            value = { type: "Literal", value: true }
        } else if (declarartion.initializer.kind === ts.SyntaxKind.FalseKeyword) {
            value = { type: "Literal", value: false }
        }
    }

    return {
        type: "LocalDecleration",
        name: declarartion.name.getText(),
        value,
    }
}