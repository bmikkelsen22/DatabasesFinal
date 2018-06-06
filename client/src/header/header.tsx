import * as React from "react";
import "./header.css";
import { NotificationContainer } from "../notifications/notification-container";
import { UserModel, NotificationModel } from "../models";

export interface HeaderProps {
  username?: string;
}

export const Header: React.SFC<HeaderProps> = props => {
  const loginLink = (
    <a className="nav-link" href="login.html">
      Login
    </a>
  );
  const currentUser = props.username ? (
    <span>Logged in as {props.username}</span>
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
      <NotificationContainer username={"parker"} />
    </header>
  );
};
