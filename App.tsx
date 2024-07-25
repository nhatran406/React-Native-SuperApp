/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useMemo, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  NativeModules,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import RNFS from 'react-native-fs';
import {useApp} from './useApp';

const {ConnectNativeModule} = NativeModules;

export interface App {
  bundleId: string;
  appName: string;
  version: string;
  appCode: string;
}

function App(): JSX.Element {
  const {appInStore} = useApp();
  const [input, setInput] = useState<string>('');

  const hostDocumentDirectoryPath = useMemo(() => {
    if (Platform.OS === 'android') {
      // return RNFS.DocumentDirectoryPath;
      return '//data/data/com.superapp/files';
    } else if (Platform.OS === 'ios') {
      return RNFS.MainBundlePath;
    }
    return '';
  }, []);

  const goToNextApp = useCallback(
    async (item: App) => {
      const params = {
        text: input,
        hostDocumentDirectoryPath,
        ...item,
      };
      console.info('TODO: params', params);
      ConnectNativeModule?.openApp(
        item.appName,
        item.appCode,
        item.version,
        item.bundleId,
        params,
        false,
        () => {},
      );

      const result = await ConnectNativeModule?.getBundleNames();
      return result;
    },
    [input],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
      keyboardVerticalOffset={64}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Input send to miniapp</Text>
          <TextInput
            value={input}
            placeholder="please input here"
            onChangeText={text => setInput(text)}
            style={styles.input}
          />
          <View style={styles.content}>
            {appInStore.map(app => (
              <TouchableOpacity
                key={app?.bundleId}
                style={styles.btnApp}
                onPress={() => goToNextApp(app)}>
                <Text style={styles.appName}>{app?.appName}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  appName: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
  },
  btnApp: {
    borderWidth: 1,
    backgroundColor: '#999',
    padding: 16,
    borderRadius: 60,
  },
  input: {
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 20,
  },
});

export default App;
