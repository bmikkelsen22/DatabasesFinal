import * as React from "react";
import * as ReactDOM from "react-dom";
import "./request.css";
import { GroupRequestModel } from "../models";
import { getRequestList } from "./request-api";
import { Request } from "./request";

export interface RequestProps {
	gID?: number;
}

export interface RequestState {
	requestmodel?: GroupRequestModel[];
}

export class RequestContainer extends React.Component<RequestProps, RequestState> {
	constructor(props: RequestProps) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		if (this.props.gID) {
			getRequestList(this.props.gID).then(this.onRequestModelLoaded);
		}
	}

	onRequestModelLoaded = ( rml: GroupRequestModel[] ) => {
		this.setState({ requestmodel: rml });
	};
	
	componentWillReceiveProps(newProps: RequestProps) {
		if (this.props.gID !== newProps.gID) {
			getRequestList(this.props.gID).then(this.onRequestModelLoaded);
		} else {
			this.setState({ requestmodel: undefined });
		}
	}

	onRequestAccepted = (index: number) => {
		if (this.state.requestmodel) {
		const newRequest = this.state.requestmodel.slice()
		newRequest.splice(index,1);
		this.setState({ requestmodel: newRequest});
		}
	}

	render() {
		if (!this.state.requestmodel) {	
			return(
				<div className="request-container">
					<h3>Join Requests</h3>
					<p>No pending requests at this time.</p>
				</div>
			);
		} else {  
			const requests = this.state.requestmodel
				  .map( (e, i) => (
				  		<Request
						groupRequest={e}
						handleClick={() => this.onRequestAccepted(i)}
						/>
				  ));
			return (
					  <div className="request-container">
					  <h3>Join Requests</h3>
					  <div className="request-wrapper">
					  {requests}
					  </div>
					  </div>
			);
		} 

	}
}
