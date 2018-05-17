import * as React from "react";
import * as ReactDOM from "react-dom";
import "./site.css";
import { Header } from "./header/header";

const uname = "Brooks Mikkelsen";

ReactDOM.render(
  <Header username={uname} />,
  document.getElementById("react-root")
);
