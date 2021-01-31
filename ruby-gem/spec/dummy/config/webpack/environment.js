const { environment } = require("@rails/webpacker")
const erb = require("./loaders/erb")
const path = require("path")
const webpack = require("webpack")

// Fixes issues with resolving linked packages with peer dependencies when developing
environment.config.resolve.modules = [path.resolve("./node_modules")]
// environment.config.resolve.symlinks = false // Enabling this will make webpack-dev-server unable to watch for changes

environment.loaders.append("babel", {
  test: /\.(js|jsx)$/,
  use: {
    loader: "babel-loader",
    options: {
      cacheCompression: false,
      cacheDirectory: true
    }
  }
})

// Makes it possible to not import these very used components
environment.plugins.append(
  "ProvidePlugin",
  new webpack.ProvidePlugin({
    Account: ["api-maker/models", "Account"],
    Hash: ["shared/hash", "default"],
    I18n: ["@kaspernj/api-maker", "I18n"],
    Layout: ["components/layout", "default"],
    Params: ["shared/params", "default"],
    Project: ["api-maker/models", "Project"],
    PropTypesExact: "prop-types-exact",
    React: "react",
    Routes: ["shared/routes", "default"],
    setStateAsync: ["shared/set-state-async", "default"],
    Task: ["api-maker/models", "Task"],

    Checkbox: ["@kaspernj/api-maker-bootstrap", "Checkbox"],
    Checkboxes: ["@kaspernj/api-maker-bootstrap", "Checkboxes"],
    Input: ["@kaspernj/api-maker-bootstrap", "Input"],
    Select: ["@kaspernj/api-maker-bootstrap", "Select"]
  })
)

environment.loaders.prepend("erb", erb)
module.exports = environment
