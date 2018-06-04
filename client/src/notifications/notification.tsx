import * as React from "react";
import "./notifications.css";
import { NotificationModel } from "../models";

export interface NotificationProps {
	notification: NotificationModel;
}

export const Notification: React.SFC<NotificationProps> = props => {
	return (
		<div className="dropdown-entry">
		<h3>{props.notification.firstName} {props.notification.lastName}</h3>
		<p>{props.notification.message}</p>
		</div>
	);
}
