import { GroupRequestModel } from "../models";
import { getRequest, postRequest } from "../api-calls";

export async function addRequest(newRequest: GroupRequestModel) {
	const res = await postRequest("../../api/addrequest.php", newRequest);
	const rID = Number(res);
	if (!rID) {
		throw new Error(res);
	}

	return rID;
}

