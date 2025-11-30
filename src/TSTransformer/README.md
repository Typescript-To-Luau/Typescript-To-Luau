# TSTransformer

## Overview
TSTransformer is a TypeScript-to-Luau compiler component that handles the transformation and conversion of TypeScript Abstract Syntax Trees (AST) into equivalent Luau code.

## Purpose
This module serves as the core transformation engine for the Roblox TypeScript-to-Luau transpiler. It processes parsed TypeScript code and generates valid Luau syntax suitable for execution in Roblox environments.

## Key Features
- **AST Traversal**: Walks through TypeScript AST nodes
- **Type Translation**: Converts TypeScript types to Luau equivalents
- **Syntax Conversion**: Transforms TypeScript expressions and statements into Luau
- **Module Handling**: Manages imports/exports and module systems

## How It Works
1. Receives parsed TypeScript AST from the parser
2. Transforms each node recursively
3. Emits corresponding Luau code
4. Handles language-specific differences and incompatibilities

## Output
Generates `.lua` files with Roblox-compatible Luau code that preserves the original TypeScript logic.