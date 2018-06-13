import * as React from "react";
import * as ReactDOM from "react-dom";
import { GroupModel, MemberModel, UserModel, GroupRequestModel } from "../models";
import { getGroupDetails } from "../group/group-api";
import { removeUser } from "./users-api";
import { UserBlock } from "./users";
import "./users.css";

export interface UsersProps {
	groupId?: number;
}

export interface UsersState {
	users?: MemberModel[];
	currentMember?: MemberModel;
}

export class UserManager extends React.Component<UsersProps, UsersState> {
	constructor(props: UsersProps) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		if (this.props.groupId) {
			getGroupDetails(this.props.groupId).then(this.onGroupModelLoaded);
		}
	}

	onGroupModelLoaded = (gm: GroupModel) => {
		this.setState({
			users: gm.members,
			currentMember: gm.currentUser
		});
	};

	componentWillReceiveProps(newProps: UsersProps) {
		if (this.props.groupId !== newProps.groupId) {
			getGroupDetails(newProps.groupId).then(this.onGroupModelLoaded);
		} else {
			this.setState({
				users: undefined,
				currentMember: undefined
			});
		}
	}

	onUserRemoved = (index:number) => {
		if (this.state.users) {
			const newUser = this.state.users.slice()
				newUser.splice(index,1);
					  this.setState({ users: newUser });
		}
	}



	render() {
		if (!this.state.users || !this.props.groupId) {
			return (
				<div className="users-container">
					  <h3>Users</h3>
					  <p>No users in this group. (?)</p>
				</div>
			);
		} else {
			const jankID: number = (this.props.groupId) ? (this.props.groupId) : ( -1 );
			const jankAdmin: boolean = (this.state.currentMember && this.state.currentMember.mAdmin == true) ? 
							 (true) : (false);

			const users = this.state.users
				  .map ( (e, i) => (
				  		<UserBlock
						 thisMember={e}
						 mAdmin={jankAdmin}
						 groupId={jankID}
						 handleClick={() => this.onUserRemoved(i)}
						/>
				  ));
			return (
				<div className="users-container">
				<h3>Users</h3>
				<div className="users-wrapper">
				{users}
				</div>
				</div>
			);
		}
	}
}
