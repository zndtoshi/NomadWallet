//
//  EventEmitter.h
//  NomadWallet
//
//  Created by Marcos Rodriguez on 12/25/20.
//  Copyright © 2020 NomadWallet. All rights reserved.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface EventEmitter : RCTEventEmitter <RCTBridgeModule>

+ (EventEmitter *)sharedInstance;
- (void)sendUserActivity:(NSDictionary *)userInfo;

@end
