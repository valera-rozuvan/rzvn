interface IUsersStateItem {
  id: string;
  email: string;
  password: string;
  isActive: string;
  createdAt: string;
}

type IUsersState = IUsersStateItem[];

export {
  IUsersStateItem,
  IUsersState,
};
