import * as React from "react";
import * as ReactDOM from "react-dom";
import "./site.css";
import { Header } from "../header/header";
import { Modal } from "../modal/modal";
import { TestPage } from "./test-page/test-page";

export interface GroupPageProps {
  groupId: string;
}

export interface GroupPageState {
  
}

export class GroupPage extends React.Component<


ReactDOM.render(<TestPage />, document.getElementById("react-root"));
