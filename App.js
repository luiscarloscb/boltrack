import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import MainNavigator from './MainNavigator';

const AppContainer = createAppContainer(MainNavigator)


export default class App extends Component {
  render() {
    return (
      <View style={{ flex:1 }}>
        <AppContainer/>
      </View>
    );
  }
}
