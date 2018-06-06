import { GroupRequestModel } from "../models";
import { getRequest, postRequest } from "../api-calls";

export async function getRequestList(gID?: number): Promise<GroupRequestModel[]> {
	const result = await getRequest(`../../api/getgrouprequest.php?gid=${gID}`);

	return JSON.parse(result);
}

export async function acceptRequest(request: GroupRequestModel) {
	const res = await postRequest("../../api/acceptRequest.php",request);
	
	if (!res.includes("Accepted")) {
		throw new Error(res);
	}
}
