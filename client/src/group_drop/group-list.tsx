import * as React from "react";
import * as ReactDOM from "react-dom";
import "../notifications/notifications.css";
import { GroupTileModel } from "../models";
import { getGroupList } from "./group-tile-api";
import { GroupTile } from "./group-tile";

export interface GroupListProps {
	username?: string;
}

export interface GroupListState {
	grouplist?: GroupTileModel[];
}

export class GroupListContainer extends React.Component<GroupListProps, GroupListState> {
	constructor(props: GroupListProps) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		if (this.props.username) {
			getGroupList(this.props.username).then(this.onGroupModelLoaded);
		}
	}

	onGroupModelLoaded = ( gtl: GroupTileModel[] ) => {
		this.setState({ grouplist: gtl });
	};

	componentWillReceiveProps(newProps: GroupListProps) {
		if (this.props.username !== newProps.username) {
			if (newProps.username) {
				getGroupList(newProps.username).then(this.onGroupModelLoaded);
			} else {
				this.setState({grouplist: undefined});
			}
		}
	}

	render() {
		if (!this.state.grouplist || this.state.grouplist.length == 0) {
			return (
			<div className="dropdown">
			<span>Groups</span>
			<div className="dropdown-content">
			<p>You are not a member of any groups.</p>
			</div>
			</div>
			);
		} else {
		
		const groups = this.state.grouplist
			.map( e => (
				<GroupTile 
				group={e} 
				/>
			));

		return (
			<div className="dropdown">
			<span>Groups</span>
			<div className="dropdown-content">
				{groups}
			</div>
			</div>
		);
		}
	}
}
