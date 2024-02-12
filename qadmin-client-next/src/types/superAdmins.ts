interface ISuperAdminsStateItem {
  id: string;
  email: string;
  password: string;
  isActive: string;
  createdAt: string;
}

type ISuperAdminsState = ISuperAdminsStateItem[];

export {
  ISuperAdminsStateItem,
  ISuperAdminsState,
};
