import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
  Image,
  Platform,
} from 'react-native';
// import AppInfo from './app.json';
// import {initRegistry} from './miniRegistry';
import {initRegistry} from './miniRegistry';

const {ConnectNativeModule} = NativeModules;
const App = (props: any): JSX.Element => {
  const uriAssets = isAndroid => (isAndroid ? 'assets:' : '');

  const [brandName, setBrandName] = useState('');
  const [appInfo, setAppInfo] = useState();

  useEffect(() => {
    async function fetchData() {
      const data = await initRegistry();
      setBrandName(data || '');
    }
    fetchData();
  }, []);
  const logoUri = './acb_logo.png';

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ACB Lite</Text>
      <Text style={styles.content}>Super app: {JSON.stringify(props)}</Text>
      <Text style={styles.content}>Phone Brand name: {brandName}</Text>
      <Image source={require(logoUri)} alt="dauxanh" />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          ConnectNativeModule?.closeApp();
        }}>
        <Text style={styles.content}>Close mini app now!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    color: 'red',
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
    color: 'blue',
  },
  button: {
    borderRadius: 4,
    backgroundColor: 'green',
    borderWidth: StyleSheet.hairlineWidth,
    padding: 20,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
