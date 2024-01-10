import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
// import AppInfo from './app.json';
// import {initRegistry} from './miniRegistry';
import {initRegistry} from './miniRegistry';

const {ConnectNativeModule} = NativeModules;
const App = (props: any): JSX.Element => {
  const [brandName, setBrandName] = useState('');
  useEffect(() => {
    async function fetchData() {
      const data = await initRegistry();
      setBrandName(data || '');
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ACB Lite</Text>
      <Text style={styles.content}>Super app: {JSON.stringify(props)}</Text>
      <Text style={styles.content}>Phone Brand name: {brandName}</Text>
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
