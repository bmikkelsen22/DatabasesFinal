import { GroupTileModel } from "../models";
import { getRequest, postRequest } from "../api-calls";

export async function getGroupList(username?: string): Promise<GroupTileModel[]> {
		  const result = await getRequest(`/~okonekp/cs340/DatabasesFinal/api/getgrouplist.php?username=${username}`);

	return JSON.parse(result);
}
