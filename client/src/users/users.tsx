import * as React from "react";
import { MemberModel, UserModel, GroupRequestModel } from "../models";
import { getGroupDetails } from "../group/group-api";
import { removeUser } from "./users-api";

export interface UserProps {
	thisMember: MemberModel;
	mAdmin: boolean;
	groupId: number;
	handleClick: (() => void);
}

export const UserBlock: React.SFC<UserProps> = props => {
	let removeBtn: JSX.Element;

	function handleClick() {
		const removeRequest: GroupRequestModel = {
			gID: props.groupId,
			rMessage: "Remove User",
			username: props.thisMember.username,
			fromGroup: true
		};

		removeUser(removeRequest);
		props.handleClick();
	}

	removeBtn = (props.mAdmin) ? (
		<button className="remove-button"
		 onClick={() => handleClick()}>
		 Remove
		</button>
	) : (
		<p></p>
	);

	const adminText = (props.thisMember.mAdmin) ? (
		<i>Administrator</i> ) : ( <i>Normal User</i> );

	return (
		<div className="user-body">
		 <h4>{props.thisMember.username}</h4>
		 {adminText}
		 {removeBtn}
		</div>
	);
}
