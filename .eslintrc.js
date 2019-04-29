module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/no-multi-comp": 0,
    "react/forbid-prop-types": 0,
    "react/prop-types": 0,
    "react/no-unescaped-entities": 0,
    "react/no-unused-state": 0,
  },
  "plugins": [
    "react",
    "react-native"
  ],
  "globals": {
		"fetch": true
	}
};