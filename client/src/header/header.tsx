import * as React from "react";
import "./header.css";
import { NotificationContainer } from "../notifications/notification-container";
import { GroupListContainer } from "../group_drop/group-list.tsx";
import { UserModel, NotificationModel, GroupTileModel } from "../models";

export interface HeaderProps {
  username?: string;
}

export const Header: React.SFC<HeaderProps> = props => {
  const loginLink = props.username ? (
    <span>
      <a className="nav-link" href="/~okonekp/cs340/DatabasesFinal/sessions/accountInfo.php">
            Account Info
      </a>
		<a className="nav-link" href="/~okonekp/cs340/DatabasesFinal/sessions/logout.php">Log out</a>
		<a className="nav-link">Logged in as {props.username}.</a>
    </span>


  ) : (
    <a className="nav-link" href="/~okonekp/cs340/DatabasesFinal/sessions/home.php">
      Login
    </a>
  );

  const notifBar = props.username ? (
	<NotificationContainer username={props.username} />
  ) : (
  	undefined
  );

  const groupBar = props.username ? (
  	<GroupListContainer username={props.username} />
  ) : (
  	undefined
  );

  return (
    <header>
      <div id="nav-container">
        <h1 id="nav-title">Expense Tracker</h1>
        <nav>
          <a className="nav-link" href="/~okonekp/cs340/DatabasesFinal/sessions/viewGroups.php">
            Groups
          </a>
          {loginLink}
        </nav>
      </div>
    		{notifBar}
			{groupBar}
		</header>
  );
};
