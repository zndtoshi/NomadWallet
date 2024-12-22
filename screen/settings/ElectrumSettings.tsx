import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Alert, Keyboard, LayoutAnimation, Platform, ScrollView, StyleSheet, Switch, TextInput, View } from 'react-native';
import * as NomadElectrum from '../../blue_modules/NomadElectrum';
import triggerHapticFeedback, { HapticFeedbackTypes, triggerSelectionHapticFeedback } from '../../blue_modules/hapticFeedback';
import { NomadCard, NomadSpacing10, NomadSpacing20, NomadText } from '../../NomadComponents';
import DeeplinkSchemaMatch from '../../class/deeplink-schema-match';
import presentAlert from '../../components/Alert';
import Button from '../../components/Button';
import { scanQrHelper } from '../../helpers/scan-qr';
import loc from '../../loc';
import {
  DoneAndDismissKeyboardInputAccessory,
  DoneAndDismissKeyboardInputAccessoryViewID,
} from '../../components/DoneAndDismissKeyboardInputAccessory';
import DefaultPreference from 'react-native-default-preference';
import { DismissKeyboardInputAccessory, DismissKeyboardInputAccessoryViewID } from '../../components/DismissKeyboardInputAccessory';
import { useTheme } from '../../components/themes';
import { RouteProp, useRoute } from '@react-navigation/native';
import { DetailViewStackParamList } from '../../navigation/DetailViewStackParamList';
import { useExtendedNavigation } from '../../hooks/useExtendedNavigation';
import { CommonToolTipActions } from '../../typings/CommonToolTipActions';
import { Divider } from '@rneui/themed';
import { Header } from '../../components/Header';
import AddressInput from '../../components/AddressInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_IO_BLUEWALLET } from '../../blue_modules/currency';
import { Action } from '../../components/types';
import ListItem, { PressableWrapper } from '../../components/ListItem';
import HeaderMenuButton from '../../components/HeaderMenuButton';
import { useSettings } from '../../hooks/context/useSettings';

type RouteProps = RouteProp<DetailViewStackParamList, 'ElectrumSettings'>;

export interface ElectrumServerItem {
  host: string;
  port?: number;
  sslPort?: number;
}

const ElectrumSettings: React.FC = () => {
  const { colors } = useTheme();
  const { server } = useRoute<RouteProps>().params;
  const { setOptions } = useExtendedNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [serverHistory, setServerHistory] = useState<ElectrumServerItem[]>([]);
  const [config, setConfig] = useState<{ connected?: number; host?: string; port?: string }>({});
  const [host, setHost] = useState<string>('');
  const [port, setPort] = useState<number | undefined>();
  const [sslPort, setSslPort] = useState<number | undefined>(undefined);
  const [isAndroidNumericKeyboardFocused, setIsAndroidNumericKeyboardFocused] = useState(false);
  const [isAndroidAddressKeyboardVisible, setIsAndroidAddressKeyboardVisible] = useState(false);
  const { setIsElectrumDisabled, isElectrumDisabled } = useSettings();

  const stylesHook = StyleSheet.create({
    inputWrap: {
      borderColor: colors.formBorder,
      backgroundColor: colors.inputBackgroundColor,
    },
    containerConnected: {
      backgroundColor: colors.feeLabel,
    },
    containerDisconnected: {
      backgroundColor: colors.redBG,
    },
    textConnected: {
      color: colors.feeValue,
    },
    textDisconnected: {
      color: colors.redText,
    },
    hostname: {
      color: colors.foregroundColor,
    },
    inputText: {
      color: colors.foregroundColor,
    },
    usePort: {
      color: colors.foregroundColor,
    },
  });

  useEffect(() => {
    let configInterval: NodeJS.Timeout | null = null;
    const fetchData = async () => {
      const savedHost = await AsyncStorage.getItem(NomadElectrum.ELECTRUM_HOST);
      const savedPort = await AsyncStorage.getItem(NomadElectrum.ELECTRUM_TCP_PORT);
      const savedSslPort = await AsyncStorage.getItem(NomadElectrum.ELECTRUM_SSL_PORT);
      const serverHistoryStr = await AsyncStorage.getItem(NomadElectrum.ELECTRUM_SERVER_HISTORY);

      const parsedServerHistory: ElectrumServerItem[] = serverHistoryStr ? JSON.parse(serverHistoryStr) : [];

      setHost(savedHost || '');
      setPort(savedPort ? Number(savedPort) : undefined);
      setSslPort(savedSslPort ? Number(savedSslPort) : undefined);
      setServerHistory(parsedServerHistory);

      setConfig(await NomadElectrum.getConfig());
      configInterval = setInterval(async () => {
        setConfig(await NomadElectrum.getConfig());
      }, 500);

      setIsLoading(false);
    };

    fetchData();

    return () => {
      if (configInterval) clearInterval(configInterval);
    };
  }, []);

  useEffect(() => {
    if (server) {
      triggerHapticFeedback(HapticFeedbackTypes.ImpactHeavy);
      Alert.alert(
        loc.formatString(loc.settings.set_electrum_server_as_default, { server: (server as ElectrumServerItem).host }),
        '',
        [
          {
            text: loc._.ok,
            onPress: () => {
              onBarScanned(JSON.stringify(server));
            },
            style: 'default',
          },
          { text: loc._.cancel, onPress: () => {}, style: 'cancel' },
        ],
        { cancelable: false },
      );
    }
  }, [server]);

  const clearHistory = useCallback(async () => {
    setIsLoading(true);
    await AsyncStorage.setItem(NomadElectrum.ELECTRUM_SERVER_HISTORY, JSON.stringify([]));
    setServerHistory([]);
    setIsLoading(false);
  }, []);

  const serverExists = useCallback(
    (value: ElectrumServerItem) => {
      return serverHistory.some(s => `${s.host}:${s.port}:${s.sslPort}` === `${value.host}:${value.port}:${value.sslPort}`);
    },
    [serverHistory],
  );

  const save = useCallback(async () => {
    Keyboard.dismiss();
    setIsLoading(true);

    try {
      if (!host && !port && !sslPort) {
        await AsyncStorage.removeItem(NomadElectrum.ELECTRUM_HOST);
        await AsyncStorage.removeItem(NomadElectrum.ELECTRUM_TCP_PORT);
        await AsyncStorage.removeItem(NomadElectrum.ELECTRUM_SSL_PORT);
        await DefaultPreference.setName(GROUP_IO_BLUEWALLET);
        await DefaultPreference.clear(NomadElectrum.ELECTRUM_HOST);
        await DefaultPreference.clear(NomadElectrum.ELECTRUM_TCP_PORT);
        await DefaultPreference.clear(NomadElectrum.ELECTRUM_SSL_PORT);
      } else {
        await AsyncStorage.setItem(NomadElectrum.ELECTRUM_HOST, host);
        await AsyncStorage.setItem(NomadElectrum.ELECTRUM_TCP_PORT, port?.toString() || '');
        await AsyncStorage.setItem(NomadElectrum.ELECTRUM_SSL_PORT, sslPort?.toString() || '');
        if (!serverExists({ host, port, sslPort })) {
          const newServerHistory = [...serverHistory, { host, port, sslPort }];
          await AsyncStorage.setItem(NomadElectrum.ELECTRUM_SERVER_HISTORY, JSON.stringify(newServerHistory));
          setServerHistory(newServerHistory);
        }
        await DefaultPreference.setName(GROUP_IO_BLUEWALLET);
        await DefaultPreference.set(NomadElectrum.ELECTRUM_HOST, host);
        await DefaultPreference.set(NomadElectrum.ELECTRUM_TCP_PORT, port?.toString() || '');
        await DefaultPreference.set(NomadElectrum.ELECTRUM_SSL_PORT, sslPort?.toString() || '');
      }
      triggerHapticFeedback(HapticFeedbackTypes.NotificationSuccess);
      presentAlert({ message: loc.settings.electrum_saved });
    } catch (error) {
      triggerHapticFeedback(HapticFeedbackTypes.NotificationError);
      presentAlert({ message: (error as Error).message });
    }
    setIsLoading(false);
  }, [host, port, sslPort, serverExists, serverHistory]);

  const resetToDefault = useCallback(() => {
    Alert.alert(loc.settings.electrum_reset, loc.settings.electrum_reset_to_default, [
      {
        text: loc._.cancel,
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: loc._.ok,
        style: 'destructive',
        onPress: async () => {
          setHost('');
          setPort(undefined);
          setSslPort(undefined);
          await save();
        },
      },
    ]);
  }, [save]);

  const selectServer = useCallback(
    (value: string) => {
      const parsedServer = JSON.parse(value) as ElectrumServerItem;
      setHost(parsedServer.host);
      setPort(parsedServer.port);
      setSslPort(parsedServer.sslPort);
      save();
    },
    [save],
  );

  const clearHistoryAlert = useCallback(() => {
    triggerHapticFeedback(HapticFeedbackTypes.ImpactHeavy);
    Alert.alert(loc.settings.electrum_clear_alert_title, loc.settings.electrum_clear_alert_message, [
      { text: loc.settings.electrum_clear_alert_cancel, onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      { text: loc.settings.electrum_clear_alert_ok, onPress: () => clearHistory() },
    ]);
  }, [clearHistory]);

  const onPressMenuItem = useCallback(
    (id: string) => {
      switch (id) {
        case CommonToolTipActions.ResetToDefault.id:
          resetToDefault();
          break;
        case CommonToolTipActions.ClearHistory.id:
          clearHistoryAlert();
          break;
        default:
          try {
            selectServer(id);
          } catch (error) {
            console.warn('Unknown menu item selected:', id);
          }
          break;
      }
    },
    [clearHistoryAlert, resetToDefault, selectServer],
  );

  const toolTipActions = useMemo(() => {
    const actions: Action[] = [CommonToolTipActions.ResetToDefault];

    if (serverHistory.length > 0) {
      const serverSubactions: Action[] = serverHistory.map(value => ({
        id: JSON.stringify(value),
        text: `${value.host}`,
        subtitle: `${value.port || value.sslPort}`,
        menuState: `${host}:${port}:${sslPort}` === `${value.host}:${value.port}:${value.sslPort}`,
        disabled: isLoading || (host === value.host && (port === value.port || sslPort === value.sslPort)),
      }));

      actions.push({
        id: 'server_history',
        text: loc.settings.electrum_history,
        subactions: [CommonToolTipActions.ClearHistory, ...serverSubactions],
      });
    }
    return actions;
  }, [host, isLoading, port, serverHistory, sslPort]);

  const HeaderRight = useMemo(
    () => <HeaderMenuButton actions={toolTipActions} onPressMenuItem={onPressMenuItem} />,
    [onPressMenuItem, toolTipActions],
  );

  useEffect(() => {
    setOptions({
      headerRight: isElectrumDisabled ? null : () => HeaderRight,
    });
  }, [HeaderRight, isElectrumDisabled, setOptions]);

  const checkServer = async () => {
    setIsLoading(true);
    try {
      const features = await NomadElectrum.serverFeatures();
      triggerHapticFeedback(HapticFeedbackTypes.NotificationWarning);
      presentAlert({ message: JSON.stringify(features, null, 2) });
    } catch (error) {
      triggerHapticFeedback(HapticFeedbackTypes.NotificationError);
      presentAlert({ message: (error as Error).message });
    }
    setIsLoading(false);
  };

  const onBarScanned = (value: string) => {
    let v = value;
    if (value && DeeplinkSchemaMatch.getServerFromSetElectrumServerAction(value)) {
      v = DeeplinkSchemaMatch.getServerFromSetElectrumServerAction(value) as string;
    }
    const [scannedHost, scannedPort, type] = v?.split(':') ?? [];
    setHost(scannedHost);
    if (type === 's') {
      setSslPort(Number(scannedPort));
      setPort(undefined);
    } else {
      setPort(Number(scannedPort));
      setSslPort(undefined);
    }
  };

  const importScan = async () => {
    const scanned = await scanQrHelper('ElectrumSettings', true);
    if (scanned) {
      onBarScanned(scanned);
    }
  };

  const onSSLPortChange = (value: boolean) => {
    Keyboard.dismiss();
    if (value) {
      setPort(undefined);
      setSslPort(port);
    } else {
      setPort(sslPort);
      setSslPort(undefined);
    }
  };

  const onElectrumConnectionEnabledSwitchChange = async (value: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    try {
      triggerSelectionHapticFeedback();
      await NomadElectrum.setDisabled(value);
      setIsElectrumDisabled(value);
    } catch (error) {
      triggerHapticFeedback(HapticFeedbackTypes.NotificationError);
      presentAlert({ message: (error as Error).message });
    }
  };

  const renderElectrumSettings = () => {
    return (
      <>
        <Divider />
        <NomadSpacing20 />
        <Header leftText={loc.settings.electrum_status} />
        <NomadSpacing20 />

        <NomadCard>
          <View style={styles.connectWrap}>
            <View style={[styles.container, config.connected === 1 ? stylesHook.containerConnected : stylesHook.containerDisconnected]}>
              <NomadText
                style={[styles.textConnectionStatus, config.connected === 1 ? stylesHook.textConnected : stylesHook.textDisconnected]}
              >
                {config.connected === 1 ? loc.settings.electrum_connected : loc.settings.electrum_connected_not}
              </NomadText>
            </View>
          </View>
          <NomadSpacing10 />
          <NomadText style={[styles.hostname, stylesHook.hostname]} onPress={checkServer} selectable>
            {config.host}:{config.port}
          </NomadText>
        </NomadCard>
        <NomadSpacing20 />

        <Divider />
        <NomadSpacing10 />
        <NomadSpacing20 />

        <Header leftText={loc.settings.electrum_preferred_server} />
        <NomadCard>
          <NomadText>{loc.settings.electrum_preferred_server_description}</NomadText>
          <NomadSpacing20 />
          <AddressInput
            testID="HostInput"
            placeholder={loc.formatString(loc.settings.electrum_host, { example: '10.20.30.40' })}
            address={host}
            onChangeText={text => setHost(text.trim())}
            editable={!isLoading}
            onBarScanned={importScan}
            keyboardType="default"
            onBlur={() => setIsAndroidAddressKeyboardVisible(false)}
            onFocus={() => setIsAndroidAddressKeyboardVisible(true)}
            inputAccessoryViewID={DoneAndDismissKeyboardInputAccessoryViewID}
            isLoading={isLoading}
          />
          <NomadSpacing20 />
          <View style={styles.portWrap}>
            <View style={[styles.inputWrap, stylesHook.inputWrap]}>
              <TextInput
                placeholder={loc.formatString(loc.settings.electrum_port, { example: '50001' })}
                value={sslPort?.toString() === '' || sslPort === undefined ? port?.toString() || '' : sslPort?.toString() || ''}
                onChangeText={text => {
                  const parsed = Number(text.trim());
                  if (Number.isNaN(parsed)) {
                    // Handle invalid input
                    sslPort === undefined ? setPort(undefined) : setSslPort(undefined);
                    return;
                  }
                  sslPort === undefined ? setPort(parsed) : setSslPort(parsed);
                }}
                numberOfLines={1}
                style={[styles.inputText, stylesHook.inputText]}
                editable={!isLoading}
                placeholderTextColor="#81868e"
                underlineColorAndroid="transparent"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="number-pad"
                inputAccessoryViewID={DismissKeyboardInputAccessoryViewID}
                testID="PortInput"
                onFocus={() => setIsAndroidNumericKeyboardFocused(true)}
                onBlur={() => setIsAndroidNumericKeyboardFocused(false)}
              />
            </View>
            <NomadText style={[styles.usePort, stylesHook.usePort]}>{loc.settings.use_ssl}</NomadText>
            <Switch
              testID="SSLPortInput"
              value={sslPort !== undefined}
              onValueChange={onSSLPortChange}
              disabled={host?.endsWith('.onion') ?? false}
            />
          </View>
        </NomadCard>
        <NomadCard>
          <NomadSpacing20 />
          <Button showActivityIndicator={isLoading} disabled={isLoading} testID="Save" onPress={save} title={loc.settings.save} />
        </NomadCard>

        {Platform.select({
          ios: <DismissKeyboardInputAccessory />,
          android: isAndroidNumericKeyboardFocused && <DismissKeyboardInputAccessory />,
        })}

        {Platform.select({
          ios: (
            <DoneAndDismissKeyboardInputAccessory
              onClearTapped={() => setHost('')}
              onPasteTapped={text => {
                setHost(text);
                Keyboard.dismiss();
              }}
            />
          ),
          android: isAndroidAddressKeyboardVisible && (
            <DoneAndDismissKeyboardInputAccessory
              onClearTapped={() => {
                setHost('');
                Keyboard.dismiss();
              }}
              onPasteTapped={text => {
                setHost(text);
                Keyboard.dismiss();
              }}
            />
          ),
        })}
      </>
    );
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      automaticallyAdjustContentInsets
      contentInsetAdjustmentBehavior="automatic"
      automaticallyAdjustKeyboardInsets
      testID="ElectrumSettingsScrollView"
    >
      <ListItem
        Component={PressableWrapper}
        title={loc.settings.electrum_offline_mode}
        switch={{
          onValueChange: onElectrumConnectionEnabledSwitchChange,
          value: isElectrumDisabled,
          testID: 'ElectrumConnectionEnabledSwitch',
        }}
        disabled={isLoading}
        bottomDivider={false}
        subtitle={loc.settings.electrum_offline_description}
      />

      {!isElectrumDisabled && renderElectrumSettings()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  connectWrap: {
    width: 'auto',
    height: 34,
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  hostname: {
    textAlign: 'center',
  },
  container: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 20,
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderBottomWidth: 0.5,
    minHeight: 44,
    height: 44,
    alignItems: 'center',
    borderRadius: 4,
  },
  portWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    flex: 1,
    marginHorizontal: 8,
    minHeight: 36,
    height: 36,
  },
  textConnectionStatus: {
    fontWeight: 'bold',
  },
  usePort: {
    marginHorizontal: 16,
  },
});

export default ElectrumSettings;
