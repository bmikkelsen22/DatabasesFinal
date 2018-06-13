import * as React from "react";
import * as ReactDOM from "react-dom";
import "../site.css";
import { Header } from "../header/header";
import { Modal } from "../modal/modal";
import { GroupModel, UserModel, ExpenseModel, MemberModel, GroupRequestModel } from "../models";
import {
  getGroupDetails,
  payExpense,
  deleteExpense,
  addExpense
} from "./group-api";
import { RequestContainer } from "../requests/request-container";
import { ExpenseContainer } from "./expense-container";
import { UserManager } from "../users/users-container";
import { AddExpense } from "./add-expense";
import "./group-page.css";

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
  }

  componentDidMount() {
    if (this.props.groupId) {
      getGroupDetails(this.props.groupId).then(this.onGroupModelLoaded);
    }
  }

  onGroupModelLoaded = (gm: GroupModel) => {
    this.setState({
      groupModel: gm,
      currentMember: gm.currentUser
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

  onExpensePaid = (expense: ExpenseModel) => {
    const { currentMember, groupModel } = this.state;
    if (!currentMember || !groupModel) {
      return;
    }
    payExpense(expense.eID, currentMember.username)
      .then(() => {
        const expPaidIdx = expense.users.findIndex(
          u => u.username === currentMember.username
        )!;
        const newExpensesPaid = expense.users.slice();
        newExpensesPaid[expPaidIdx] = {
          ...newExpensesPaid[expPaidIdx],
          pPaid: 1
        };

        const expIdx = groupModel.expenses.indexOf(expense);
        const newExpenses = groupModel.expenses.slice();
        newExpenses[expIdx] = {
          ...newExpenses[expIdx],
          users: newExpensesPaid
        };

        this.setState({ groupModel: { ...groupModel, expenses: newExpenses } });
      })
      .catch(e => alert(e));
  };

  onExpenseDeleted = (expense: ExpenseModel) => {
    const { groupModel } = this.state;
    if (!groupModel) {
      return;
    }
    if (!confirm("Are you sure you want to delete this expense?")) {
      return;
    }
    deleteExpense(expense.eID)
      .then(() => {
        const expenses = groupModel.expenses.filter(e => e != expense);
        this.setState({
          groupModel: { ...groupModel, expenses }
        });
      })
      .catch(e => alert(e));
  };

  onExpenseAdded = (expense: ExpenseModel) => {
    const { groupModel } = this.state;
    if (!groupModel) {
      return;
    }
    addExpense(expense)
      .then(eID => {
        expense.eID = eID;
        expense.users.forEach(u => (u.eID = eID));
        const newGroupModel = {
          ...groupModel,
          expenses: [...groupModel.expenses, expense]
        };

        this.setState({ groupModel: newGroupModel });
      })
      .catch(e => alert(e));
  };

  renderPageContent() {
    const { currentMember, groupModel } = this.state;
    if (!this.props.groupId) {
      return <p>Invalid group ID</p>;
    } else if (!groupModel) {
      return <p>Loading...</p>;
    } else if (!currentMember) {
      return <p>Please log in.</p>;
    }

	const requests = (this.state.currentMember && this.state.currentMember.mAdmin == true) ? (
		  <RequestContainer gID={groupModel.gID}/> ) : (
			undefined
		  );

	const users = (this.state.currentMember && this.props.groupId) ? (
			<UserManager groupId={groupModel.gID}/>
		) : (
			undefined
		);

    return (
      <div>
        <h2>{groupModel.gName}</h2>
        <p>{groupModel.gDesc}</p>
			<AddExpense
          onExpenseAdded={this.onExpenseAdded}
          groupMembers={groupModel.members}
          gID={groupModel.gID}
          username={currentMember.username}
        />

		  {requests}
			{users}
        
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
        <Header
          username={
            this.state.currentMember
              ? this.state.currentMember.username
              : undefined
          }
        />
        <div className="main-content">{this.renderPageContent()}</div>
      </div>
    );
  }
}

const url = new URL(window.location.href);
const groupId =
  url.searchParams.get("gID") || url.searchParams.get("gid") || undefined;
ReactDOM.render(
  <GroupPage groupId={Number(groupId)} />,
  document.getElementById("react-root")
);
