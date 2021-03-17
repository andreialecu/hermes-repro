import React, {useState} from 'react';
import {View, Text} from 'react-native';
import cloneDeep from 'lodash/fp/cloneDeep';

const results = {
  parse: [],
  clone: [],
  parseClone: [],
};

const hermesTest = async () => {
  const response = await fetch(
    'https://gist.githubusercontent.com/karol-bisztyga/856f68c238b3e0f421a95f31e6bc9ed3/raw/2add80d545aea70f7576ac2bcf48915682bfb555/random-json2.json',
  );
  let responseJson = await response.json();
  const text = JSON.stringify(responseJson);

  let timeFlag, now;
  timeFlag = Date.now();
  const parsed = JSON.parse(text);
  now = Date.now();
  results.parse.push(now - timeFlag);

  timeFlag = Date.now();
  cloneDeep(parsed);
  now = Date.now();
  results.clone.push(now - timeFlag);

  timeFlag = Date.now();
  cloneDeep(JSON.parse(text));
  now = Date.now();
  results.parseClone.push(now - timeFlag);
};

const App = () => {
  const [result, setResult] = useState(false);
  const foo = (a, b, c) => a + (b * (c - b)) / a;
  console.log('is it HERMES?', foo.toString());
  if (!result) {
    (async () => {
      for (let i = 0; i < 10; ++i) {
        console.log('test', i);
        await hermesTest();
      }
      setResult(true);
      console.log(results);
    })();
  }
  console.log('result', result);
  return (
    <View>
      <Text>HERMES TEST</Text>
      <Text>{result ? 'done' : 'in progress'}</Text>
    </View>
  );
};

export default App;
