import { MemberModel, ExpenseModel, ExpensesPaid, GroupModel } from "../models";
import { userMock, groupDetailsMock } from "./expense-mocks";

export interface GroupDetailsResponse {
  gID: number;
  gName: string;
  gDesc: string;
  members: MemberModel[];
  expenses: ExpenseModel[];
  expensesPaid: ExpensesPaid[];
}

function processExpenseData(groupResponse: GroupDetailsResponse): GroupModel {
  groupResponse.expenses.forEach(
    e => (e.users = groupResponse.expensesPaid.filter(ep => ep.eID === e.eID))
  );
  return groupResponse; //group model is pretty much the same but doesnt have expensesPaid
}

export function getCurrentMember(groupMembers: MemberModel[]) {
  const currentUser = userMock; //TODO: load this from cookies

  return groupMembers.find(m => m.username === currentUser.username);
}

export function getGroupDetails(gid?: number) {
  return new Promise<GroupModel>((resolve, reject) => {
    resolve(processExpenseData(groupDetailsMock));
  });
}
