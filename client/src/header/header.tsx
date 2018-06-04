import * as React from "react";
import "./header.css";
import { NotificationContainer } from "./notifications/notifications";
import { UserModel, NotificationModel } from "../models";

export interface HeaderProps {
  currentUser?: UserModel;
}

export const Header: React.SFC<HeaderProps> = props => {
  const loginLink = (
    <a className="nav-link" href="login.html">
      Login
    </a>
  );
  const currentUser = props.currentUser ? (
    <span>Logged in as {props.currentUser.username}</span>
  ) : (
    loginLink
  );

  return (
    <header>
      <div id="nav-container">
        <h1 id="nav-title">Expense Tracker</h1>
        <nav>
          <a className="nav-link" href="index.html">
            Home
          </a>
          {loginLink}
        </nav>
      </div>
      <div id="current-user-header">{currentUser}</div>
      <NotificationContainer username={currentUser} />
    </header>
  );
};
