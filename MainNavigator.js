import React from "react";
import { createStackNavigator } from "react-navigation";
import {
  Login,
  Opciones,
  CrearPlan,
  InfoClientes,
  ListarPlanes,
  ListarVisitas
} from "./src/screens";
import { List } from "native-base";

const MainNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Opciones: {
    screen: Opciones
  },
  CrearPlan: {
    screen: CrearPlan
  },
  InfoClientes: {
    screen: InfoClientes
  },
  ListarPlanes: {
    screen: ListarPlanes
  },
  ListarVisitas: {
    screen: ListarVisitas
  }
});

export default MainNavigator;
