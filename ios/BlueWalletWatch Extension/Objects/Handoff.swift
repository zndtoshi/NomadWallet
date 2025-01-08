//
//  Handoff.swift
//  NomadWalletWatch Extension
//
//  Created by Admin on 9/27/21.
//  Copyright © 2021 NomadWallet. All rights reserved.
//

import Foundation

enum HandoffIdentifier: String {
  case ReceiveOnchain = "io.nomadwallet.nomadwallet.receiveonchain"
  case Xpub = "io.nomadwallet.nomadwallet.xpub"
  case ViewInBlockExplorer = "io.nomadwallet.nomadwallet.blockexplorer"
}

enum HandOffUserInfoKey: String {
  case ReceiveOnchain = "address"
  case Xpub = "xpub"
}

enum HandOffTitle: String {
  case ReceiveOnchain = "View Address"
  case Xpub = "View XPUB"
}
