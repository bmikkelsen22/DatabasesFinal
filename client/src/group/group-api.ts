import { MemberModel, ExpenseModel, ExpensesPaid, GroupModel } from "../models";
import { userMock } from "./expense-mocks";
import { getRequest, postRequest } from "../api-calls";

export async function getGroupDetails(gid?: number): Promise<GroupModel> {
  const result = await getRequest(`../../api/getgroupdetails.php?gid=${gid}`);
  return JSON.parse(result);
}

export async function deleteExpense(eID: number) {
  const res = await getRequest(`../../api/deleteexpense.php?eid=${eID}`);
  if (!res.includes("Deleted")) {
    throw new Error(res);
  }
}

export async function payExpense(eID: number, username: string) {
  const res = await getRequest(
    `../../api/payexpense.php?eid=${eID}&username=${username}`
  );
  if (!res.includes("Marked paid")) {
    throw new Error(res);
  }
}

export async function addExpense(newExpense: ExpenseModel) {
  const res = await postRequest("../../api/addexpense.php", newExpense);
  const eID = Number(res);
  if (!eID) {
    throw new Error(res);
  }

  return eID;
}
