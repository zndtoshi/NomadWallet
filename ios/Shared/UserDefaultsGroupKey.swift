//
//  UserDefaultsGroupKeys.swift
//  NomadWallet
//
//  Created by Marcos Rodriguez on 4/14/24.
//  Copyright © 2024 NomadWallet. All rights reserved.
//

import Foundation

enum UserDefaultsGroupKey: String {
  case GroupName = "group.io.nomadwallet.nomadwallet"
  case PreferredCurrency = "preferredCurrency"
  case WatchAppBundleIdentifier = "io.nomadwallet.nomadwallet.watch"
  case BundleIdentifier = "io.nomadwallet.nomadwallet"
  case ElectrumSettingsHost = "electrum_host"
  case ElectrumSettingsTCPPort = "electrum_tcp_port"
  case ElectrumSettingsSSLPort = "electrum_ssl_port"
  case AllWalletsBalance = "WidgetCommunicationAllWalletsSatoshiBalance"
  case AllWalletsLatestTransactionTime = "WidgetCommunicationAllWalletsLatestTransactionTime"
  case LatestTransactionIsUnconfirmed = "\"WidgetCommunicationLatestTransactionIsUnconfirmed\""
}
