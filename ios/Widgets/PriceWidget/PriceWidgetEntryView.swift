//
//  PriceWidgetEntryView.swift
//  NomadWallet
//
//  Created by Marcos Rodriguez on 10/27/24.
//  Copyright © 2024 NomadWallet. All rights reserved.
//

import SwiftUICore


@available(iOS 16.0, *)
struct PriceWidgetEntryView: View {
    let entry: PriceWidgetEntry

    var body: some View {
        PriceView(entry: entry)
    }
}
