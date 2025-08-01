import html from "eslint-plugin-html"
import jquery from "eslint-plugin-jquery"
import prettier from "eslint-plugin-prettier"
import globals from "globals"
import path from "node:path"
import { fileURLToPath } from "node:url"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"
import { includeIgnoreFile } from "@eslint/compat"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})
const gitignorePath = path.resolve(__dirname, ".gitignore")

export default [
  {
    ignores: [
      "build",
      "**/fonts/*",
      "**/vendors/*",
      "**/*.min.js",
      "!**/util.js",
      "**/build/",
      "**/modules/**/*.js",
      "release",
      ".yarn",
      "node_modules"
    ]
  },
  includeIgnoreFile(gitignorePath),
  ...compat.extends("eslint:recommended", "plugin:prettier/recommended"),
  {
    plugins: {
      html,
      jquery,
      prettier
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        ...globals.jquery
      },

      ecmaVersion: 2022,
      sourceType: "module"
    },

    rules: {
      "comma-dangle": 0,

      "prettier/prettier": [
        "error",
        {
          htmlWhitespaceSensitivity: "ignore",
          vueIndentScriptAndStyle: false,
          trailingComma: "none",
          tabWidth: 2,
          printWidth: 80,
          semi: false,
          singleQuote: false,
          overrides: [
            {
              files: ["**/*.scss"],
              options: {
                semi: true
              }
            },
            {
              files: ["**/*.yaml"],
              options: {
                singleQuote: false
              }
            },
            {
              files: "**/*.ps1",
              options: {
                parser: "powershell"
              }
            }
          ]
        }
      ],
      "no-undef": "off"
    }
  }
]
