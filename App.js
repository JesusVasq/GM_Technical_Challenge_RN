import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';

const PUBLIC_REPO = "https://api.github.com/repos/JesusVasq/GM_Technical_Challenge/commits?sha=develop&per_page=50";

const Commit = ({message, sha, author}) => (
  <View style={{flex: 1, flexDirection: 'column'}}>
    <Text>{message}</Text>
    <Text>{sha}</Text>
    <Text>{author}</Text>
  </View>
);

const RenderSeparator = () => (
  <View
    style={{
      backgroundColor: 'black',
      height: 0.5,
    }}
  />
);

const App = () => {

  const [commitList, setCommitList] = useState([]);

  useEffect(() => {
    // console.log("Hello");
    fetch(PUBLIC_REPO, {method: "GET"})
    .then(response => response.json())
    .then(result => parseData(result))
    .catch(error => console.log('error', error));
  },[]);

  const renderCommit = ({item}) => (
    <Commit author={`${item.author}`} sha={`${item.sha}`} message={`${item.message}`}/>
  );

  let parseData = (commitJSONArray) =>{
    // console.log("Parsing data!");

    let tempCommitList = [];

    for(var i = 0; i < commitJSONArray.length; i ++){
      let single_commit = commitJSONArray[i];

      let sha = single_commit.sha;
      let author = single_commit.commit.author.name;
      let message = single_commit.commit.message;

      tempCommitList.push({sha: sha, author: author, message: message});
    }

    // console.log(tempCommitList);
    setCommitList(tempCommitList);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <FlatList
        data={commitList}
        renderItem={renderCommit}
        keyExtractor={commit => commit.sha}
        ItemSeparatorComponent={RenderSeparator}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor:"#FF0000",
  }
});

export default App;
