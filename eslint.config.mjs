import js from "@eslint/js";
import tseslint from "typescript-eslint";
import obsidianmd from "eslint-plugin-obsidianmd";

export default tseslint.config(
    {
        ignores: ["node_modules/**", "out/**", "tests/**", "*.mjs", "*.json"],
    },
	js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...obsidianmd.configs.recommended,
  	{
    	files: ["**/*.ts"],
    	languageOptions: {
      		parserOptions: { projectService: true }
    	},
		rules: {
			"obsidianmd/rule-custom-message": "off",
			"obsidianmd/commands/no-plugin-id-in-command-id": "off",
			"no-undef": "off",
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-unsafe-argument": "warn",
			"@typescript-eslint/no-unsafe-assignment": "warn",
			"@typescript-eslint/no-unsafe-call": "warn",
			"@typescript-eslint/no-unsafe-member-access": "warn",
			"@typescript-eslint/no-unsafe-return": "warn",
		}
	}
);
