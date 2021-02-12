import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';

const PUBLIC_REPO = "https://api.github.com/repos/GeekyAnts/NativeBase/commits";

// Component used to render individual items in FlatList
const Commit = ({message, sha, author}) => (
  <View style={{flex: 1, flexDirection: 'column', margin: 5}}>
    <Text style={{fontSize: 15, marginBottom: 5}}>{message}</Text>
    <Text style={{fontSize: 10,}}>{sha}</Text>
    <Text style={{alignSelf: "flex-end"}}>{author}</Text>
  </View>
);

// Component used for visual seperator between items in FlatList
const RenderSeparator = () => (
  <View
    style={{
      backgroundColor: '#d3d3d3',
      height: 5,
    }}
  />
);

const App = () => {
  // Commits stored as an array of dictionaries
  const [commitList, setCommitList] = useState([]);

  useEffect(() => {
    fetch(PUBLIC_REPO, {method: "GET"})
    .then(response => response.json())
    .then(result => parseData(result))
    .catch(error => console.log('error', error));
  },[]);

  const renderCommit = ({item}) => (
    <Commit author={`${item.author}`} sha={`${item.sha}`} message={`${item.message}`}/>
  );
  // parse raw JSON data returned  in response and extract data needed 
  let parseData = (commitJSONArray) =>{

    let tempCommitList = [];
    for(var i = 0; i < commitJSONArray.length; i ++){
      let single_commit = commitJSONArray[i];

      let sha = single_commit.sha;
      let author = single_commit.commit.author.name;
      let message = single_commit.commit.message;

      tempCommitList.push({sha: sha, author: author, message: message});
    }
    setCommitList(tempCommitList);
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <FlatList
        data={commitList}
        renderItem={renderCommit}
        keyExtractor={commit => commit.sha}
        ItemSeparatorComponent={RenderSeparator}
      />
    </SafeAreaView>
  )
}

export default App;
