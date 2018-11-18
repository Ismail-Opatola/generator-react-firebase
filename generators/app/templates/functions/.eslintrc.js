module.exports = {
  extends: "../.eslintrc",
  rules: {
    "no-console": 0
  },
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "/"]
      }
    }
  }
};
