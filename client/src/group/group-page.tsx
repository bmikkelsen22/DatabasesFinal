import * as React from "react";
import * as ReactDOM from "react-dom";
import "../site.css";
import { Header } from "../header/header";
import { Modal } from "../modal/modal";
import { GroupModel, UserModel, ExpenseModel, MemberModel } from "../models";
import { getCurrentMember, getGroupDetails } from "./group-api";
import { PlaceholderPage } from "../error-component";
import { ExpenseContainer } from "./expense-container";

export interface GroupPageProps {
  groupId?: number;
}

export interface GroupPageState {
  groupModel?: GroupModel;
  currentMember?: MemberModel;
}

export class GroupPage extends React.Component<GroupPageProps, GroupPageState> {
  constructor(props: GroupPageProps) {
    super(props);
    this.state = {};
    if (props.groupId) {
      getGroupDetails(props.groupId).then(this.onGroupModelLoaded);
    }
  }

  onGroupModelLoaded = (gm: GroupModel) => {
    this.setState({
      groupModel: gm,
      currentMember: getCurrentMember(gm.members)
    });
  };

  componentWillReceiveProps(newProps: GroupPageProps) {
    if (this.props.groupId !== newProps.groupId) {
      if (newProps.groupId) {
        getGroupDetails(newProps.groupId).then(this.onGroupModelLoaded);
      } else {
        this.setState({
          groupModel: undefined
        });
      }
    }
  }

  onExpensePaid = (expense: ExpenseModel) => {};

  onExpenseDeleted = (expense: ExpenseModel) => {};

  renderPageContent() {
    const { currentMember, groupModel } = this.state;
    if (!currentMember) {
      return <p>Please log in.</p>;
    } else if (!groupModel) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <h2>{groupModel.gName}</h2>
        <p>{groupModel.gDesc}</p>
        <ExpenseContainer
          expenses={groupModel.expenses}
          onDelete={this.onExpenseDeleted}
          onPay={this.onExpensePaid}
          currentMember={currentMember}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentMember} />
        <div className="main-content">{this.renderPageContent()}</div>
      </div>
    );
  }
}

const url = new URL(window.location.href);
const groupId = url.searchParams.get("gID") || undefined;
ReactDOM.render(
  <GroupPage groupId={Number(groupId)} />,
  document.getElementById("react-root")
);
