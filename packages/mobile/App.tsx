import React from 'react';
import { Text, View } from 'react-native';
import { Pomodoro } from 'pomodoro-like-app-projects';

const style = {
  flex: 'row',
  height: 300,
  width: 300,
  backgroundColor: 'red',
  flex: 3,
};

const App = () => {
  const pomodoro = Pomodoro.of({
    name: 'first pomodro',
    id: '123',
  });

  return (
    <>
      <View style={style}>
        <Text>Ce sa si faci</Text>
      </View>
      <View style={style}>
        <Text>again</Text>
      </View>
      <Text>{pomodoro + ''}</Text>
      <Text>Frumos ce sa faci</Text>
    </>
  );
};

export default App;
