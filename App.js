import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';

const PUBLIC_REPO = "";

const App = () => {

  const [commitList, setCommitList] = useState([]);

  useEffect(() => {
    console.log("Hello");
    fetch("https://api.github.com/repos/JesusVasq/GM_Technical_Challenge/commits?sha=develop&per_page=50", {method: "GET"})
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  },[])

  let parseData = (commitJSONArray) =>{
    console.log("Parsing data!");
  }

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
