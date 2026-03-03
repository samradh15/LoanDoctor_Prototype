require("@babel/register")({
  presets: ["@babel/preset-env", ["@babel/preset-react", {runtime: "classic"}]]
});
const React = require("react");
const { renderToString } = require("react-dom/server");
const App = require("./src/App.jsx").default;

try {
  renderToString(React.createElement(App));
  console.log("No initial rendering errors found.");
} catch (e) {
  console.error("Runtime error caught:", e);
}
