import React from "react";
import { createStackNavigator } from "react-navigation";
import {
  Login,
  Opciones,
  CrearPlan,
  InfoClientes,
  ListarPlanes,
  ListarVisitas,
  CrearVisita
} from "./src/screens";
import { Camara } from "./src/components/Camera";
import { List } from "native-base";

const MainNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  Opciones: {
    screen: Opciones,
    navigationOptions: {
      headerLeft: null
    }
  },
  CrearPlan: {
    screen: CrearPlan
  },
  CrearVisita: {
    screen: CrearVisita
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
