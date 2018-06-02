import { MemberModel, NotificationsModel } from "../../models";
import { getRequest, postRequest } from "../../api-calls";

export async function getNotificationList(nReceiver?: string): Promise<NotificationsModel[]> {
	 const result = await getRequest(`../../api/getnotifications.php?username=${nReceiver}`);

	 return JSON.parse(result);
}

