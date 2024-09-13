import React from "react";
import ReactDOM from "react-dom/client";

import { render } from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import "./style.scss";
import { App } from "./app";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
  <App />
  </Router>
)
// render(
//   <Router>
//     <App />
//   </Router>,
//   document.getElementById("root")
// );
