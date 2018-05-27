import * as React from "react";
import { Header } from "./header/header";
import { UserModel } from "./models";

export interface PlaceholderProps {
  message: string;
  currentUser?: UserModel;
}

export const PlaceholderPage: React.SFC<PlaceholderProps> = props => {
  return (
    <div>
      <Header currentUser={props.currentUser} />
      <p>{props.message}</p>
    </div>
  );
};
