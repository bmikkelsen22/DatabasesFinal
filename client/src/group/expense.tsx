import * as React from "react";
import { ExpenseModel, MemberModel } from "../models";
import "./expense.css";

export interface ExpenseProps {
  expense: ExpenseModel;
  onPay: (expense: ExpenseModel) => void;
  onDelete: (expense: ExpenseModel) => void;
  currentMember: MemberModel;
}

export const Expense: React.SFC<ExpenseProps> = props => {
  let payNowBtn: JSX.Element;
  const amtToPay = props.expense.eCostTotal / props.expense.users.length;
  if (
    props.expense.users.find(
      u => u.username === props.currentMember.username && u.paid
    )
  ) {
    payNowBtn = <div className="expense-paid">All paid up!</div>;
  } else {
    payNowBtn = (
      <button
        className="yellow-button"
        onClick={() => props.onPay(props.expense)}
      >
        Pay ${amtToPay.toFixed(2)}
        <br />
        <span className="small-font">
          of ${props.expense.eCostTotal.toFixed(2)}
        </span>
      </button>
    );
  }

  const havePaidUsers =
    props.expense.users
      .filter(u => u.paid)
      .map(u => u.username)
      .join(", ") || "none";

  const notPaidUsers =
    props.expense.users
      .filter(u => !u.paid)
      .map(u => u.username)
      .join(", ") || "none";

  const deleteBtn = props.currentMember.mAdmin ? (
    <button
      className="gray-button"
      onClick={() => props.onDelete(props.expense)}
    >
      Delete
    </button>
  ) : (
    undefined
  );

  return (
    <div className="expense">
      <div className="expense-header">
        <div>
          <h4>{props.expense.eName}</h4>
          <p>{props.expense.eDesc}</p>
        </div>
        {payNowBtn}
      </div>
      <div className="expense-body">
        <p>Has paid: {havePaidUsers}</p>
        <p>Not paid yet: {notPaidUsers}</p>
        
        {deleteBtn}
      </div>
    </div>
  );
};
