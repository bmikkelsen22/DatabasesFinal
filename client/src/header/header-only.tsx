import * as React from "react";
import * as ReactDOM from "react-dom";
import { Header } from "./header";
import { UserModel } from "../models";

export function renderHeader(currentUser: UserModel, elementId: string) {
  ReactDOM.render(
    <Header currentUser={currentUser} />,
    document.getElementById(elementId)
  );
}
