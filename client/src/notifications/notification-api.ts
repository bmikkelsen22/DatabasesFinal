import { MemberModel, NotificationModel, NotificationsModel } from "../models";
import { getRequest, postRequest } from "../api-calls";

export async function getNotificationList(nReceiver?: string): Promise<NotificationModel[]> {
	const result = await getRequest(`../../api/getnotifications.php?username=${nReceiver}`);

	return JSON.parse(result);
}

/*export async function addUserNotification(newNotification: NotificationsModel) {
	const result = await postRequest("../../api/addusernotification.php", newNotification);
	
	const nID = Number(result);

	if (!nID) {
		throw new Error(result);
	}
	return nID;
}

export async function addGroupNotification(newNotification: NotificationsModel, gId: number) {
	 *This function can go one of two ways, by calling the previous several times, or by
	 * calling a new php function, which would take slightly more effort, but be faster.
}*/
