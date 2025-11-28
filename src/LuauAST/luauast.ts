export type LuauNode =
    | LuauBlock
    | LuauClass
    | LuauLocalDecleration
    | LuauFunctionDecleration
    | LuauIdentifier
    | LuauMemberAccess
    | LuauCallExpression
    | LuauLiteral;

export interface LuauBlock {
    type: "Block";
    statements: LuauNode[];
}

export interface LuauClass {
    type: "Class";
    name: "string";
    properties: LuauLocalDecleration[];
    methods: LuauFunctionDecleration[];
}

export interface LuauLocalDecleration {
    type: "LocalDecleration";
    name: string;
    value: LuauNode | null;
}

export interface LuauFunctionDecleration {
    type: "FunctionDecleration";
    name: string;
    parameters: string[];
    body: LuauBlock;
}

export interface LuauCallExpression {
    type: "CallExpression";
    called: LuauNode;
    args: LuauNode[];
}

export interface LuauIdentifier {
    type: "Identifier";
    name: string;
}

export interface LuauLiteral {
    type: "Literal";
    value: string | number | boolean | null;
}

export interface LuauMemberAccess {
    type: "MemberAccess";
    object: LuauNode;
    member: string;
}