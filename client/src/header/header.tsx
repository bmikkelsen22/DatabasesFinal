import * as React from "react";
import "./header.css";
import { NotificationContainer } from "../notifications/notification-container";
import { UserModel, NotificationModel } from "../models";

export interface HeaderProps {
  username?: string;
}

export const Header: React.SFC<HeaderProps> = props => {
  const loginLink = props.username ? (
    <span>
      Logged in as {props.username}.
      <a className="nav-link" href="/~mikkelsb/cs340/final/DatabasesFinal/sessions/logout.php">Log out</a>
    </span>
  ) : (
    <a className="nav-link" href="login.html">
      Login
    </a>
  );

  const notifBar = props.username ? (
	<NotificationContainer username={props.username} />
  ) : (
  	undefined
  );

  return (
    <header>
      <div id="nav-container">
        <h1 id="nav-title">Expense Tracker</h1>
        <nav>
          <a className="nav-link" href="/~mikkelsb/cs340/final/DatabasesFinal/sessions/home.php">
            Home
          </a>
          <a className="nav-link" href="/~mikkelsb/cs340/final/DatabasesFinal/sessions/viewGroups.php">
            Groups
          </a>
          {loginLink}
        </nav>
      </div>
    		{notifBar}
		</header>
  );
};
