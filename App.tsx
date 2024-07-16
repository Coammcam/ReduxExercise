import {View, Text} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import ExpenseMngScreen from './src/screens/ExpenseMngScreen';

const App = () => {
  return (
    <Provider store={store}>
      <ExpenseMngScreen />
    </Provider>
  );
};

export default App;
