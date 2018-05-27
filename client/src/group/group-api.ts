import { MemberModel, ExpenseModel, ExpensesPaid, GroupModel } from "../models";
import { userMock } from "./expense-mocks";
import { getRequest } from "../api-calls";

export function getCurrentMember(groupMembers: MemberModel[]) {
  const currentUser = userMock; //TODO: load this from cookies

  return groupMembers.find(m => m.username === currentUser.username);
}

export async function getGroupDetails(gid?: number): Promise<GroupModel> {
  const result = await getRequest(`../../api/getgroupdetails.php?gid=${gid}`);
  return JSON.parse(result);
}