import React, { Component } from "react";
import { View, AppState } from "react-native";
import { createAppContainer, NavigationActions } from "react-navigation";
import MainNavigator from "./MainNavigator";
import { headerColor } from "./src/utils/colors";
import StatusBar from "./src/components/StatusBar";

import { guardarDato, eliminarDatos } from "./src/utils/localStorageAPI";
import { Root } from "native-base";
import { Font, AppLoading } from "expo";
const AppContainer = createAppContainer(MainNavigator);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      appState: AppState.currentState
    };
  }
  async componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
    //   eliminarDatos(["TOKEN", "DATA", "CONFIG", "PLANES", "ORDENES"]);
  }
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }
  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (this.state.appState.match(/background/) && nextAppState === "active") {
      this.navigator &&
        this.navigator.dispatch(
          NavigationActions.navigate({ routeName: "Login" })
        );
    }
    this.setState({ appState: nextAppState });
  };

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
        <AppContainer
          ref={nav => {
            this.navigator = nav;
          }}
        />
      </View>
    );
  }
}
