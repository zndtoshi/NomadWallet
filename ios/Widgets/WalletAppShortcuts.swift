//
//  WalletAppShortcuts.swift
//  NomadWallet


import AppIntents

@available(iOS 16.4, *)
struct WalletAppShortcuts: AppShortcutsProvider {
    
    @AppShortcutsBuilder
    static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: PriceIntent(),
            phrases: [
                AppShortcutPhrase<PriceIntent>("Market rate for Bitcoin in \(\.$fiatCurrency) using NomadWallet"),
                AppShortcutPhrase<PriceIntent>("Get the current Bitcoin market rate in \(\.$fiatCurrency) with NomadWallet"),
                AppShortcutPhrase<PriceIntent>("What's the current Bitcoin rate in \(\.$fiatCurrency) using NomadWallet?"),
                AppShortcutPhrase<PriceIntent>("Show me the current Bitcoin price in \(\.$fiatCurrency) via NomadWallet"),
                AppShortcutPhrase<PriceIntent>("Retrieve Bitcoin rate in \(\.$fiatCurrency) from NomadWallet")
            ],
            shortTitle: "Market Rate",
            systemImageName: "bitcoinsign.circle"
        )
        
    }
}
