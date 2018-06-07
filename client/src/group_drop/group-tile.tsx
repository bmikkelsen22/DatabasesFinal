import * as React from "react";
import { GroupTileModel } from "../models";

export interface GroupTileProps {
	group: GroupTileModel;
}

export const GroupTile: React.SFC<GroupTileProps> = props => {
	const href = ("/~okonekp/cs340/DatabasesFinal/client/public/group.html?gID=" + props.group.gID);

	return (
		<div className="dropdown-entry">
		<h3>{props.group.gName}</h3>
		<a href={href}>{props.group.gDesc}</a>
		</div>
	);
}
