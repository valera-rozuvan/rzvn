interface IAppsStateItem {
  id: string;
  serviceName: string;
  publicKey: string;
  privateKey: string;
  isActive: string;
  callbackUrl: string;
  createdAt: string;
}

type IAppsState = IAppsStateItem[];

export {
  IAppsStateItem,
  IAppsState,
};
