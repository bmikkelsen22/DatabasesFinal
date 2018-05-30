import * as React from "react";
import { MemberModel } from "../models";

export interface SelectMember extends MemberModel {
  selected: boolean;
}

export interface SelectUsersProps {
  selectMembers: SelectMember[];
  onUserSelected: (user: SelectMember, index: number) => void;
}

export const SelectUsers: React.SFC<SelectUsersProps> = props => {
  const usersJsx = props.selectMembers.map((u, i) => (
    <div className="select-user">
      <input
        type="checkbox"
        onChange={() => props.onUserSelected(u, i)}
        checked={u.selected}
        key={u.username}
        value={u.username}
      />
      <div>
        {u.firstName} {u.lastName} <br />
        <span className="small-font">{u.username}</span>
      </div>
    </div>
  ));

  return <div className="select-users-container">{usersJsx}</div>;
}