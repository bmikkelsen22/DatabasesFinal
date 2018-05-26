import * as React from "react";
import { ExpenseModel, MemberModel } from "../models";
import { Expense } from "./expense";

export interface ExpenseContainerProps {
  expenses: ExpenseModel[];
  onPay: (expense: ExpenseModel) => void;
  onDelete: (expense: ExpenseModel) => void;
  currentMember: MemberModel;
}

export interface ExpenseContainerState {
  allExpanded: boolean;
}

export class ExpenseContainer extends React.Component<
  ExpenseContainerProps,
  ExpenseContainerState
> {
  constructor(props: ExpenseContainerProps) {
    super(props);
    this.state = {
      allExpanded: false
    };
  }

  toggleShowAll = () => {
    this.setState({
      allExpanded: !this.state.allExpanded
    });
  };

  render() {
    const incompleteExpenses = this.props.expenses
      .filter(e => !e.users.every(u => u.paid))
      .map(e => (
        <Expense
          expense={e}
          onDelete={this.props.onDelete}
          onPay={this.props.onPay}
          currentMember={this.props.currentMember}
        />
      ));
    let completeExpenses: JSX.Element[];
    if (this.state.allExpanded) {
      const completeExpenses = this.props.expenses
        .filter(e => e.users.every(u => u.paid))
        .map(e => (
          <Expense
            expense={e}
            onDelete={this.props.onDelete}
            onPay={this.props.onPay}
            currentMember={this.props.currentMember}
          />
        ));
    }

    const toggleMessage = this.state.allExpanded
      ? "Hide complete expenses"
      : "Show all expenses";

    return (
      <div className="expense-container">
        <h2>Incomplete Expenses</h2>
        {incompleteExpenses}
        <a onClick={this.toggleShowAll}>{toggleMessage}</a>
        <h2>Complete Expenses</h2>
        {this.state.allExpanded ? completeExpenses! : undefined}
      </div>
    );
  }
}
