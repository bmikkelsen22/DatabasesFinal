import { GroupDetailsResponse } from "./group-api";
import { UserModel } from "../models";

export const groupDetailsMock: GroupDetailsResponse = {
  gID: 1,
  gName: "Brooks's fake group",
  gDesc: "This is from the test data!",
  members: [
    {
      username: "brooks",
      firstName: "Brooks",
      lastName: "Mikkelsen",
      email: "bmikkelsen22@gmail.com",
      mAdmin: true
    },
    {
      username: "user2",
      firstName: "Another",
      lastName: "User",
      email: "user2@gmail.com",
      mAdmin: false
    }
  ],
  expenses: [
    {
      eID: 1,
      gID: 1,
      eName: "Groceries",
      eDesc: "Ostrich meat, cactus thorns",
      eCostPaid: 5,
      eCostTotal: 10,
      users: []
    },
    {
      eID: 2,
      gID: 1,
      eName: "Internet",
      eDesc: "bill for xfinity",
      eCostPaid: 0,
      eCostTotal: 50,
      users: []
    }
  ],
  expensesPaid: [
    {
      eID: 1,
      username: "brooks",
      pPaid: false
    },
    {
      eID: 1,
      username: "user2",
      pPaid: true
    },
    {
      eID: 2,
      username: "brooks",
      pPaid: false
    },
    {
      eID: 2,
      username: "user2",
      pPaid: false
    }
  ]
};

export const userMock: UserModel = {
  username: "brooks",
  firstName: "Brooks",
  lastName: "Mikkelsen",
  email: "bmikkelsen22@gmail.com"
}
