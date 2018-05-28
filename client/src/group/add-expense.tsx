import * as React from "react";
import { ExpenseModel, MemberModel } from "../models";
import { Modal } from "../modal/modal";
import { SelectMember, SelectUsers } from "./select-users";

export interface AddExpenseProps {
  onExpenseAdded: (expense: ExpenseModel) => void;
  groupMembers: MemberModel[];
  gID: number;
  username: string;
}

export interface AddExpenseState {
  showModal: boolean;
  expenseName: string;
  expenseDesc: string;
  selectedMembers: SelectMember[];
  cost: number;
}

export class AddExpense extends React.Component<
  AddExpenseProps,
  AddExpenseState
> {
  constructor(props: AddExpenseProps) {
    super(props);
    this.state = {
      showModal: false,
      expenseDesc: "",
      expenseName: "",
      selectedMembers: [],
      cost: 1
    };
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  addExpense = () => {
    const expensesPaid = this.state.selectedMembers.map(m => {
      return {
        eID: 0,
        username: this.props.username,
        pPaid: 0
      };
    });
    this.toggleModal();
    this.props.onExpenseAdded({
      gID: this.props.gID,
      eID: 0,
      eName: this.state.expenseName,
      eDesc: this.state.expenseDesc,
      eNumUsers: expensesPaid.length,
      eCostTotal: this.state.cost,
      users: expensesPaid
    });
    this.toggleModal();
  };

  updateExpenseName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      expenseName: event.target.value
    });
  };

  updateExpenseDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      expenseDesc: event.target.value
    });
  };

  updateCost = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      cost: Number(event.target.value) || 0
    });
  };

  updateSelectedUsers = (newSelectedUsers: SelectMember[]) => {
    this.setState({
      selectedMembers: newSelectedUsers
    });
  };

  render() {
    if (!this.state.showModal) {
      return (
        <button className="yellow-button" onClick={this.toggleModal}>
          Add new expense
        </button>
      );
    }

    return (
      <Modal
        onCancel={this.toggleModal}
        visible={this.state.showModal}
        title="Add a new expense"
      >
        <table className="add-expense-table">
          <tbody>
            <tr>
              <td>Expense name: </td>
              <td>
                <input
                  type="text"
                  value={this.state.expenseName}
                  onChange={this.updateExpenseName}
                />
              </td>
            </tr>
            <tr>
              <td>Expense description: </td>
              <td>
                <input
                  type="text"
                  value={this.state.expenseDesc}
                  onChange={this.updateExpenseDesc}
                />
              </td>
            </tr>
            <tr>
              <td>Amount: </td>
              <td>
                <input
                  type="number"
                  value={this.state.cost}
                  onChange={this.updateCost}
                />
              </td>
            </tr>
            <SelectUsers
              users={this.props.groupMembers}
              onUserSelected={this.updateSelectedUsers}
            />
            <button className="yellow-button" onClick={this.addExpense}>
              Add expense
            </button>
          </tbody>
        </table>
      </Modal>
    );
  }
}
