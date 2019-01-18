import React, { Component } from "react";
import { View } from "react-native";
import { createAppContainer } from "react-navigation";
import MainNavigator from "./MainNavigator";
import { headerColor } from "./src/utils/colors";
import StatusBar from "./src/components/StatusBar";
import { eliminarDatos } from "./src/utils/localStorageAPI";
import { Root } from "native-base";
import { Font, AppLoading } from "expo";
const AppContainer = createAppContainer(MainNavigator);

export default class App extends Component {
  //async componentDidMount() {
  //  eliminarDatos(["TOKEN", "DATA", "CONFIG", "PLANES"]);
  //}
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={headerColor} barStyle="light-content" />
        <AppContainer />
      </View>
    );
  }
}
