//
//  WalletInformationWidget.swift
//  WalletInformationWidget
//
//  Created by Marcos Rodriguez on 10/29/20.
//  Copyright © 2020 NomadWallet. All rights reserved.
//

import WidgetKit
import SwiftUI

struct WalletInformationWidgetProvider: TimelineProvider {
    typealias Entry = WalletInformationWidgetEntry
    static var lastSuccessfulEntries: [WalletInformationWidgetEntry] = []

    func placeholder(in context: Context) -> WalletInformationWidgetEntry {
        return WalletInformationWidgetEntry.placeholder
    }

    func getSnapshot(in context: Context, completion: @escaping (WalletInformationWidgetEntry) -> ()) {
        let entry: WalletInformationWidgetEntry
        if (context.isPreview) {
            entry = WalletInformationWidgetEntry(date: Date(), marketData: MarketData(nextBlock: "26", sats: "9 134", price: "$10,000", rate: 10000), allWalletsBalance: WalletData(balance: 1000000, latestTransactionTime: LatestTransaction(isUnconfirmed: false, epochValue: 1568804029000)))
        } else {
            entry = WalletInformationWidgetEntry(date: Date(), marketData: emptyMarketData)
        }
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        var entries: [WalletInformationWidgetEntry] = []
        let userPreferredCurrency = Currency.getUserPreferredCurrency()
        let allwalletsBalance = WalletData(balance: UserDefaultsGroup.getAllWalletsBalance(), latestTransactionTime: UserDefaultsGroup.getAllWalletsLatestTransactionTime())

        MarketAPI.fetchPrice(currency: userPreferredCurrency) { (result, error) in
            let entry: WalletInformationWidgetEntry

            if let result = result {
                entry = WalletInformationWidgetEntry(date: Date(), marketData: MarketData(nextBlock: "", sats: "", price: result.formattedRate ?? "!", rate: result.rateDouble), allWalletsBalance: allwalletsBalance)
                WalletInformationWidgetProvider.lastSuccessfulEntries.append(entry)
                if WalletInformationWidgetProvider.lastSuccessfulEntries.count > 5 {
                    WalletInformationWidgetProvider.lastSuccessfulEntries.removeFirst()
                }
            } else {
                if let lastEntry = WalletInformationWidgetProvider.lastSuccessfulEntries.last {
                    entry = lastEntry
                } else {
                    entry = WalletInformationWidgetEntry.placeholder
                }
            }
            entries.append(entry)
            let timeline = Timeline(entries: entries, policy: .atEnd)
            completion(timeline)
        }
    }
}

struct WalletInformationWidgetEntry: TimelineEntry {
    let date: Date
    let marketData: MarketData
    var allWalletsBalance: WalletData = WalletData(balance: 0)
}

extension WalletInformationWidgetEntry {
    static var placeholder: WalletInformationWidgetEntry {
        WalletInformationWidgetEntry(date: Date(), marketData: MarketData(nextBlock: "26", sats: "9 134", price: "$10,000", rate: 10000), allWalletsBalance: WalletData(balance: 1000000, latestTransactionTime: LatestTransaction(isUnconfirmed: false, epochValue: 1568804029000)))
    }
}

struct WalletInformationWidgetEntryView: View {
    let entry: WalletInformationWidgetEntry

    var WalletBalance: some View {
        WalletInformationView(allWalletsBalance: entry.allWalletsBalance, marketData: entry.marketData)
    }

    var body: some View {
        VStack(content: {
            WalletBalance
        }).padding().background(Color.widgetBackground)
    }
}

struct WalletInformationWidget: Widget {
    let kind: String = "WalletInformationWidget"

    var body: some WidgetConfiguration {
        if #available(iOSApplicationExtension 16.0, *) {
            return StaticConfiguration(kind: kind, provider: WalletInformationWidgetProvider()) { entry in
                WalletInformationWidgetEntryView(entry: entry)
            }
            .configurationDisplayName("Balance")
            .description("View your accumulated balance.").supportedFamilies([.systemSmall])
            .contentMarginsDisabledIfAvailable()
        } else {
            return StaticConfiguration(kind: kind, provider: WalletInformationWidgetProvider()) { entry in
                WalletInformationWidgetEntryView(entry: entry)
            }
            .configurationDisplayName("Balance")
            .description("View your accumulated balance.").supportedFamilies([.systemSmall])
            .contentMarginsDisabledIfAvailable()
        }
    }
}

struct WalletInformationWidget_Previews: PreviewProvider {
    static var previews: some View {
        WalletInformationWidgetEntryView(entry: WalletInformationWidgetEntry(date: Date(), marketData: MarketData(nextBlock: "26", sats: "9 134", price: "$10,000", rate: Double(0)), allWalletsBalance: WalletData(balance: 0, latestTransactionTime: LatestTransaction(isUnconfirmed: nil, epochValue: nil))))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}
