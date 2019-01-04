import React, { Component } from "react";
import { View } from "react-native";
import { createAppContainer } from "react-navigation";
import MainNavigator from "./MainNavigator";
import { headerColor } from "./src/utils/colors";
import StatusBar from "./src/components/StatusBar";
import { eliminarDatos } from "./src/utils/localStorageAPI";
const AppContainer = createAppContainer(MainNavigator);

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={headerColor} barStyle="light-content" />
        <AppContainer />
      </View>
    );
  }
}
