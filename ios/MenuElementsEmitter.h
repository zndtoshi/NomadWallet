//
//  MenuElementsEmitter.h
//  NomadWallet
//

#import <React/RCTEventEmitter.h>

@interface MenuElementsEmitter : RCTEventEmitter

+ (instancetype)sharedInstance;

- (void)openSettings;
- (void)addWalletMenuAction;
- (void)importWalletMenuAction;
- (void)reloadTransactionsMenuAction;

@end