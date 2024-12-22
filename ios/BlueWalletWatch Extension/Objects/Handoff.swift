//
//  Handoff.swift
//  NomadWalletWatch Extension
//
//  Created by Admin on 9/27/21.
//  Copyright © 2021 NomadWallet. All rights reserved.
//

import Foundation

enum HandoffIdentifier: String {
  case ReceiveOnchain = "io.bluewallet.bluewallet.receiveonchain"
  case Xpub = "io.bluewallet.bluewallet.xpub"
  case ViewInBlockExplorer = "io.bluewallet.bluewallet.blockexplorer"
}

enum HandOffUserInfoKey: String {
  case ReceiveOnchain = "address"
  case Xpub = "xpub"
}

enum HandOffTitle: String {
  case ReceiveOnchain = "View Address"
  case Xpub = "View XPUB"
}
