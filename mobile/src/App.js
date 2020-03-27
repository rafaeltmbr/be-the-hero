import React from 'react';
import {View, Text} from 'react-native';

import style from './AppStyle';

export default function App() {
  return (
    <View style={style.container}>
      <Text style={style.text}>Hello world</Text>
    </View>
  );
}
