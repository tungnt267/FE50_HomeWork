import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "../node_modules/bootstrap/dist/js/bootstrap.min";
import "../node_modules/jquery/dist/jquery.slim.min";
import "../node_modules/popper.js/dist/popper.min";

ReactDOM.render(
  <>
    <App />
  </>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
