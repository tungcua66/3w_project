module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
		'plugin:react-hooks/recommended',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'react',
	],
	rules: {
		// 'jsx-a11y/label-has-for': 0,
		'jsx-a11y/label-has-associated-control': ['error', {
			required: {
				some: ['nesting', 'id'],
			},
		}],
		'jsx-a11y/label-has-for': ['error', {
			required: {
				some: ['nesting', 'id'],
			},
		}],
		indent: [2, 'tab', {
			SwitchCase: 1,
			VariableDeclarator: 1,
		}],
		'react/function-component-definition': 0,
		'react/jsx-uses-react': 'off',
		'react/react-in-jsx-scope': 'off',
		'react-hooks/rules-of-hooks': 'error',
		// Vérifie les règles des Hooks
		'react-hooks/exhaustive-deps': 'warn',
		'no-tabs': 0,
		'no-underscore-dangle': 0,
		'react/jsx-indent': [2, 'tab'],
		// FOR JSX/REACT
		'react/jsx-filename-extension': 0,
		// FOR JSX/REACT
		'react/jsx-indent-props': [2, 'tab'],
		// FOR JSX/REACT
		'max-len': ['warn', 110],
		'no-plusplus': 0,
		'no-console': 'off',
		'no-restricted-syntax': ['error', {
			selector: "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
			message: 'Unexpected property on console object was called',
		}],
		'no-nested-ternary': 0,
		'jsx-a11y/click-events-have-key-events': 'off',
		'import/no-cycle': 'off',
		// add Vincent -> Flow gestion with defaultProps is internal and not external
		// https://github.com/facebook/flow/issues/1660
		// https://github.com/facebook/flow/issues/3512
		'react/require-default-props': [2, {
			forbidDefaultForRequired: false,
		}],
		'react/default-props-match-prop-types': [2, {
			allowRequiredDefaults: true,
		}],
		'import/no-extraneous-dependencies': 'off',
		'import/prefer-default-export': 'off',
		'implicit-arrow-linebreak': 'off',
		'no-param-reassign': ['warn', {
			props: true,
			ignorePropertyModificationsFor: ['draft'],
		}],
		'no-unused-vars': 'warn',
		'react/prop-types': 'warn',
		'react/no-danger': 'error',
		'no-empty-pattern': 'warn',
	},
};
