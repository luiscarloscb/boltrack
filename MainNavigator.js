import React from "react";
import { createStackNavigator } from "react-navigation";
import Login from "./src/screens/Login";

const MainNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  }
});

export default MainNavigator;
