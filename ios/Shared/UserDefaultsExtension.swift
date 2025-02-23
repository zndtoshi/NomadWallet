//
//  UserDefaultsExtension.swift
//  NomadWallet
//
//  Created by Marcos Rodriguez on 2/8/21.
//  Copyright © 2021 NomadWallet. All rights reserved.
//

import Foundation

extension UserDefaults {

func codable<Element: Codable>(forKey key: String) -> Element? {
  guard let userDefaults = UserDefaults(suiteName: UserDefaultsGroupKey.GroupName.rawValue), let data = userDefaults.data(forKey: key) else { return nil }
        let element = try? PropertyListDecoder().decode(Element.self, from: data)
        return element
    }
}
