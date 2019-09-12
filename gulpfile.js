"use strict";

const gulp = require("gulp");
const build = require("@microsoft/sp-build-web");
build.addSuppression(
  `Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`
);

build.configureWebpack.mergeConfig({
  additionalConfiguration: generatedConfiguration => {
    generatedConfiguration.externals = generatedConfiguration.externals.filter(
      name => !["react", "react-dom"].includes(name)
    );
    return generatedConfiguration;
  }
});

build.initialize(gulp);
