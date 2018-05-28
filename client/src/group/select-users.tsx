import * as React from "react";
import { MemberModel } from "../models";

export interface SelectMember extends MemberModel {
  selected: boolean;
}

export interface SelectUsersProps {
  users: MemberModel[];
  onUserSelected: (newSelectedUsers: SelectMember[]) => void;
}

export interface SelectUsersState {
  selectedUsers: SelectMember[];
}

export class SelectUsers extends React.Component<
  SelectUsersProps,
  SelectUsersState
> {
  constructor(props: SelectUsersProps) {
    super(props);
    this.state = {
      selectedUsers: props.users.map(u => {
        return { ...u, selected: false };
      })
    };
  }

  toggleUser = (user: SelectMember, index: number) => {
    const newUser = {
      ...user,
      selected: !user.selected
    };
    const newUsers = this.state.selectedUsers.slice();
    newUsers[index] = newUser;
    this.setState({
      selectedUsers: newUsers
    });
  };

  render() {
    const usersJsx = this.state.selectedUsers.map((u, i) => (
      <div>
        <input
          type="checkbox"
          onChange={() => this.toggleUser(u, i)}
          checked={u.selected}
          key={u.username}
          value={u.username}
        />
        {u.firstName} {u.lastName} <br />
        <span className="small-text">{u.username}</span>
      </div>
    ));

    return <div className="select-users-container">{usersJsx}</div>;
  }
}
