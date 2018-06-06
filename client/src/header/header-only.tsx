import * as React from "react";
import * as ReactDOM from "react-dom";
import { Header } from "./header";
import { UserModel } from "../models";

export function renderHeader(username: string, elementId: string) {
  ReactDOM.render(
    <Header username={username} />,
    document.getElementById(elementId)
  );
}
