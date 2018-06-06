import * as React from "react";
import { GroupRequestModel } from "../models";
import { acceptRequest } from "./request-api";

export interface GroupRequestProps {
	groupRequest: GroupRequestModel;
	isHidden: boolean;
}

export const Request: React.SFC<GroupRequestProps> = props => {
	let acceptBtn: JSX.Element;

	function handleClick() {
		acceptRequest(props.groupRequest);
		props.isHidden = true;
	};

	acceptBtn = (
		<button className="accept-button"
		onClick={() => acceptRequest(props.groupRequest)}>
		Accept
		</button>
	);
	
	
	return (
		<div className="request-body">
			<h4>{props.groupRequest.username}</h4>
			<p>{props.groupRequest.rMessage}</p>
			{acceptBtn}
		</div>
	);
}
