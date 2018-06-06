import * as React from "react";
import "./notifications.css";
import { NotificationModel } from "../models";

export interface NotificationProps {
	notification: NotificationModel;
}

export const Notification: React.SFC<NotificationProps> = props => {
	return (
		<div className="dropdown-entry">
		<h3>{props.notification.eName} - {props.notification.gName}</h3>
		<p>{props.notification.eDesc}</p>
		</div>
	);
}
