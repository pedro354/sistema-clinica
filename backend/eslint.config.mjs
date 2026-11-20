import js from "@eslint/js";
import tseslint from "typescript-eslint";
export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
          "@typescript-eslint/no-require-imports": "off"
        },
    },
    {
        ignores: ["dist/**", "node_modules/**", "/frontend/src/services/api.ts", "@typescript-eslint/no-unused-vars"]
    }
    ]