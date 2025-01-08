//
//  Models.swift
//  NomadWallet
//
//  Created by Marcos Rodriguez on 11/1/20.
//  Copyright © 2020 NomadWallet. All rights reserved.
//

import Foundation



let emptyMarketData = MarketData(nextBlock: "...", sats: "...", price: "...", rate: 0)
let emptyWalletData = WalletData(balance: 0, latestTransactionTime:  LatestTransaction(isUnconfirmed: false, epochValue: Int(Date().timeIntervalSince1970)))


