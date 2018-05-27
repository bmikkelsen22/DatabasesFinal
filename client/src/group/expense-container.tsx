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
          key={e.eID}
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
            key={e.eID}
          />
        ));
    }

    const toggleMessage = this.state.allExpanded
      ? "Hide complete expenses"
      : "Show all expenses";
    const completeHeader = this.state.allExpanded ? (
      <h3>Completed Expenses</h3>
    ) : (
      undefined
    );

    return (
      <div className="expense-container">
        <h3>Incomplete Expenses</h3>
        <div className="expense-wrapper">{incompleteExpenses}</div>
        {completeHeader}
        <div className="expense-wrapper">{this.state.allExpanded ? completeExpenses! : undefined}</div>
        <button onClick={this.toggleShowAll} className="gray-button">{toggleMessage}</button>
      </div>
    );
  }
}
