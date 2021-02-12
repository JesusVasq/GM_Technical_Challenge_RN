import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';


const App = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Hello, World!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor:"#FF0000",
  }
});

export default App;
