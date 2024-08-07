import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
  Image,
} from 'react-native';
import {initRegistry} from './miniRegistry';

const {ConnectNativeModule} = NativeModules;

interface MiniAppProps {
  hostDocumentDirectoryPath?: string;
}

const App = (props: MiniAppProps): JSX.Element => {
  const [brandName, setBrandName] = useState('');

  useEffect(() => {
    async function fetchData() {
      const data = await initRegistry();
      setBrandName(data || '');
    }
    fetchData();
  }, []);

  const imagePath = `file:/${props.hostDocumentDirectoryPath}/build/acb_logo.png`;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ACB Lite - 2024</Text>
      <Text style={styles.content}>Super app: {JSON.stringify(props)}</Text>
      <Text style={styles.content}>Phone Brand name: {brandName}</Text>
      <Image source={{uri: imagePath}} style={{width: 200, height: 100}} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          ConnectNativeModule?.closeApp();
        }}>
        <Text style={{color: 'white'}}>Close mini app now!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    padding: 16,
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
