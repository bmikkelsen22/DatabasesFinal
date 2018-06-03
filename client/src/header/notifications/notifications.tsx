import * as React from "react";
import * as ReactDOM from "react-dom";
import "./notifications.css";
import { NotificationModel } from "../../models";
import { getNotificationList } from "./notification-api";

export interface NotifProps {
	username?: string;
}

export interface NotifState {
	notificationModel?: NotificationModel[];
}

export class NotificationContainer extends React.Component<NotifProps, NotifState> {
	constructor(props: NotifProps) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		if (this.props.username) {
				getNotificationList(this.props.username).then(this.onNotifModelLoaded);
		}
	}

	onNotifModelLoaded = (nml: NotificationModel[]) => {
		this.setState({ notificationModel: nml });
	};

	componentWillReceiveProps(newProps: NotifProps) {
		if (this.props.username !== newProps.username) {
			if (newProps.username) {
				getNotificationList(newProps.username).then(this.onNotifModelLoaded);
			} else {
				this.setState({notificationModel: undefined});
			}
		}
	}

	render() {
		const { notificationModel } = this.state;
		if (!this.state.notificationModel)
			return;
		const notifications = this.state.notificationModel
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