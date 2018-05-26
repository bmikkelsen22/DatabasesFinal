export interface GroupModel {
  gID: number;
  gName: string;
  gDesc: string;
  expenses: ExpenseModel[];
  members: UserModel[];
}

export interface UserModel {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ExpenseModel {
  eID: number;
  gID: number;
  eName: string;
  eDesc: string;
  eCostTotal: number;
  eCostPaid: number;
  paid: ExpensesPaid[];
}

export interface ExpensesPaid {
  eID: string;
  username: string;
  paid: boolean;
}

export interface NotificationsModel {
  nID: number;
  nMessage: string;
  nSender: string;
  nReceiver: string;
}
