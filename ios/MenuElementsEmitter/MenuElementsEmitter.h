//
//  MenuElementsEmitter.h
//  NomadWallet
//
//  Created by Marcos Rodriguez on 11/7/24.
//  Copyright © 2024 NomadWallet. All rights reserved.
//


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
- (NSArray<NSString *> *)supportedEvents;

@end
