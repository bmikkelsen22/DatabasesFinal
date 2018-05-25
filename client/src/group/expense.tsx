import * as React from "react";
import { ExpenseModel } from "../models";
import "./expense.css";

export interface ExpenseProps {
  expense: ExpenseModel;
  onPay: (expense: ExpenseModel) => void;
}

export const Expense: React.SFC<ExpenseProps> = props => {
  return (
    <div className=""
  )
}