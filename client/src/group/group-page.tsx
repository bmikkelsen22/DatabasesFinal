import * as React from "react";
import * as ReactDOM from "react-dom";
import "./site.css";
import { Header } from "../header/header";
import { Modal } from "../modal/modal";
import { GroupModel, UserModel } from "../models";

export interface GroupPageProps {
  groupId?: string;
}

export interface GroupPageState {
  groupModel?: GroupModel;
  currentUser?: UserModel;
}

export class GroupPage extends React.Component<GroupPageProps, GroupPageState> {
  constructor(props: GroupPageProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { currentUser, groupModel } = this.state;
    if (!currentUser || !groupModel) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <Header username={currentUser.username} />
        <div className="main-content">
          <h2>{groupModel.gName}</h2>
          <div>{groupModel.gDesc}</div>
        </div>
      </div>
    );
  }
}

const url = new URL(window.location.href);
const groupId = url.searchParams.get("gID") || undefined;
ReactDOM.render(
  <GroupPage groupId={groupId} />,
  document.getElementById("react-root")
);
