import * as React from "react";
import { ExpenseModel } from "../models";
import "./expense.css";

export interface ExpenseProps {
  expense: ExpenseModel;
  onPay: (expense: ExpenseModel) => void;
  hasPaid: boolean;
}

export const Expense: React.SFC<ExpenseProps> = props => {
  let payNowBtn: JSX.Element;
  if (props.hasPaid) {
    payNowBtn = <div className="expense-paid">All paid up!</div>;
  } else {
    payNowBtn = (
      <button
        className="expense-pay-button"
        onClick={() => props.onPay(props.expense)}
      >
        Pay ${props.expense.eCostTotal/}
      </button>
    );
  }

  const havePaidUsers = props.expense.paid.map(p => p.username).join(", ");

  return (
    <div className="expense">
      <div className="expense-header">
        <div>
          <h4>{props.expense.eName}</h4>
          <p>{props.expense.eDesc}</p>
        </div>
        <div />
      </div>
      <div className="expense-body">
        <p>{havePaidUsers} have paid.</p>
      </div>
    </div>
  );
};
