import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}", "**/*"],
    ignores: ["*/foundry/**/*"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        // Foundry Globals
        CONFIG: `writable`,
        CONST: `readonly`,
        game: `readonly`,
        Handlebars: `readonly`,
        Hooks: `readonly`,
        ui: `readonly`,
        foundry: `readonly`,
        ChatMessage: `readonly`,
        ActiveEffect: `readonly`,
        fromUuid: `readonly`,
        fromUuidSync: `readonly`,

        // v14 Additions:
        _loc: `readonly`,
        _del: `readonly`,
        _replace: `readonly`,

        // System specific:
        CELESTUS: `writeable`,
      },
    },
  },
]);
