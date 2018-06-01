import * as React from "react";
import "./notifications.css";
import { NotificationModel } from "../../models";

export interface NotifProps {
	notifications: NotificationModel[];
}

export class NotificationContainer extends React.Component<NotifProps> {
	constructor(props: NotifProps) {
		super(props);
	}

	render() {
		const notifications = this.props.notifications
			.map( e => (
				<div className="dropdown-entry">
				<h3>{e.firstName} {e.lastName}</h3>
				<p>{e.message}</p>
				</div>
			));

	return (
		<div className="dropdown">
		<span>Notifications</span>
		<div className="dropdown-content">
			{notifications}
		</div>
		</div>
	);
	}
}