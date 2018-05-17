import * as React from "react";
import "./header.css";

export interface HeaderProps {
  username: string;
}

export const Header: React.SFC<HeaderProps> = (props) => {
  return (
    <header>
      <h1 id="nav-title">Expense Tracker</h1>
      <nav>
        <a className="nav-link" href="index.html">
          Home
        </a>
        <a className="nav-link" href="login.html">
          Login
        </a>
      </nav>
    </header>
  );
};
