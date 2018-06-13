import { GroupRequestModel } from "../models";
import { getRequest, postRequest } from "../api-calls";

export async function removeUser(user: GroupRequestModel) {
	const res = await postRequest("../../api/removeuser.php", user);
	const username = String(res);
	if (!username) {
		throw new Error(username);
	}

	return username;
}
