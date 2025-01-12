export type HomeStackParamList = {
  // ...existing routes...
  PSBTDetailsScreen: undefined; // Ensure this line exists
  CreateDMSScreen: undefined; // Add this line
  WalletTransactionScreen: undefined;
  ShowQRPSBTScreen: { address: string; amount: number };
  ImportWalletScreen: undefined;

};

export type DrawerParamList = {
  HomeStack: undefined;
  ShowQRPSBTScreen: { address: string; amount: number };
  ScanQRScreen: undefined;
};
  Home: undefined; // Ensure Home screen is defined
};
};
  // ImportWalletScreen: undefined;
  // CreateDMSScreen: undefined;
  // WalletTransactionScreen: undefined;
};

  ShowQRPSBTScreen: { address: string; amount: number };
  ScanQRScreen: undefined;
};
  ScanQRScreen: undefined;
  // Remove screens that are now part of StackNavigator
  // PSBTDetailsScreen: undefined;
  HomeStack: undefined; // StackNavigator handles its own screens
  ShowQRPSBTScreen: { address: string; amount: number };
export type DrawerParamList = {
  HomeStack: undefined;
};