module.exports = {
  default: {
    require: ["tests/runner/**/*.ts", "tests/stepdefinitions/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: ["progress"],
    paths: ["tests/features/**/*.feature"]
  }
};