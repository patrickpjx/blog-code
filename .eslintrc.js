module.exports = {
	extends: ['alloy', 'alloy/typescript'],
	env: {
		// Your environments (which contains several predefined global variables)
		//
		// browser: true,
		// node: true,
		// mocha: true,
		// jest: true,
		// jquery: true
	},
	globals: {
		// Your global variables (setting to false means it's not allowed to be reassigned)
		//
		// myGlobal: false
	},
	rules: {
		// Customize your rules
		'max-params': 0,
		'@typescript-eslint/member-ordering': 0,
		'@typescript-eslint/explicit-member-accessibility': 0,
		'@typescript-eslint/no-parameter-properties': 0,
		'no-param-reassign': 0,
	},
};
