import React from 'react';
import { Text } from 'react-native';
import { Pomodoro } from 'pomodoro-like-app-projects';

const App = () => {
  const pomodoro = Pomodoro.of({
    name: 'first pomodro',
    id: '123',
  });

  return (
    <>
      <Text>{JSON.stringify(pomodoro)}</Text>
      <Text>Frumos ce sa faci</Text>
    </>
  );
};

export default App;
