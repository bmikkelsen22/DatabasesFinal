import * as React from "react";
import * as ReactDOM from "react-dom";
import "./site.css";
import { Header } from "./header/header";
import { Modal } from "./modal/modal";
import { TestPage } from "./test-page/test-page";

ReactDOM.render(<TestPage />, document.getElementById("react-root"));
