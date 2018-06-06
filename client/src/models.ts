export interface GroupModel {
  gID: number;
  gName: string;
  gDesc: string;
  expenses: ExpenseModel[];
  members: MemberModel[];
  currentUser?: MemberModel;
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
  eNumUsers: number;
  users: ExpensesPaid[];
}

export interface ExpensesPaid {
  eID: number;
  username: string;
  pPaid: number;
}

export interface NotificationsModel {
  nID: number;
  nMessage: string;
  nSender: string;
  nReceiver: string;
}

export interface NotificationModel {
	 eName: string;
	 gName: string;
	 eDesc: string;
}

export interface GroupRequestModel {
	gID: number;	  
	rMessage: string;
	username: string;
	fromGroup: boolean;
}
