import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {DateTime} from 'luxon';

const results = {
  local: [],
  setZone: [],
  toLocaleString: [],
};

export async function intlPolyfill() {
  await import('@formatjs/intl-getcanonicallocales/polyfill');
  await import('@formatjs/intl-locale/polyfill');

  await import('@formatjs/intl-pluralrules/polyfill');
  await import('@formatjs/intl-pluralrules/locale-data/en');
  await import('@formatjs/intl-pluralrules/locale-data/ro');

  await import('@formatjs/intl-numberformat/polyfill');
  await import('@formatjs/intl-numberformat/locale-data/en');
  await import('@formatjs/intl-numberformat/locale-data/fr');

  await import('@formatjs/intl-relativetimeformat/polyfill');
  await import('@formatjs/intl-relativetimeformat/locale-data/en');
  await import('@formatjs/intl-relativetimeformat/locale-data/ro');

  await import('@formatjs/intl-datetimeformat/polyfill');
  await import('@formatjs/intl-datetimeformat/locale-data/en');
  await import('@formatjs/intl-datetimeformat/locale-data/ro');
  await import('@formatjs/intl-datetimeformat/add-golden-tz');
}

const hermesTest = async () => {
  let start = Date.now();
  for (let i = 0; i < 100; i++) {
    DateTime.local();
  }
  results.local.push(Date.now() - start);

  start = Date.now();
  for (let i = 0; i < 100; i++) {
    DateTime.local().setZone('America/New_York');
  }
  results.setZone.push(Date.now() - start);

  start = Date.now();
  for (let i = 0; i < 100; i++) {
    DateTime.local().toLocaleString();
  }
  results.toLocaleString.push(Date.now() - start);
};

const App = () => {
  const [result, setResult] = useState(false);
  const foo = (a, b, c) => a + (b * (c - b)) / a;
  console.log('is it HERMES?', foo.toString());
  if (!result) {
    (async () => {
      await intlPolyfill();
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
