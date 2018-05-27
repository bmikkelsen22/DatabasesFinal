export interface GroupModel {
  gID: number;
  gName: string;
  gDesc: string;
  expenses: ExpenseModel[];
  members: MemberModel[];
}

export interface UserModel {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface MemberModel extends UserModel {
  mAdmin: boolean;
}

export interface ExpenseModel {
  eID: number;
  gID: number;
  eName: string;
  eDesc: string;
  eCostTotal: number;
  eCostPaid: number;
  users: ExpensesPaid[];
}

export interface ExpensesPaid {
  eID: number;
  username: string;
  paid: boolean;
}

export interface NotificationsModel {
  nID: number;
  nMessage: string;
  nSender: string;
  nReceiver: string;
}
