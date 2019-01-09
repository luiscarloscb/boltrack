import React from "react";
import { createStackNavigator } from "react-navigation";
import {
  Login,
  Opciones,
  CrearPlan,
  InfoClientes,
  ListarPlanes,
  ListarVisitas,
  CrearVisita,
  RegistrarCliente
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
      headerLeft: null,
      headerTitle: "OPCIONES"
    }
  },
  CrearPlan: {
    screen: CrearPlan,
    navigationOptions: {
      headerTitle: "CREAR PLAN DE VISITA"
    }
  },
  CrearVisita: {
    screen: CrearVisita,
    navigationOptions: {
      headerTitle: "REALIZAR VISITA"
    }
  },
  InfoClientes: {
    screen: InfoClientes,
    navigationOptions: {
      headerTitle: "LISTA DE CLIENTES"
    }
  },
  ListarPlanes: {
    screen: ListarPlanes,
    navigationOptions: {
      headerTitle: "LISTA DE PLANES"
    }
  },
  ListarVisitas: {
    screen: ListarVisitas,
    navigationOptions: {
      headerTitle: "LISTA DE VISITAS REALIZADAS"
    }
  },
  RegistrarCliente: {
    screen: RegistrarCliente,
    navigationOptions: {
      headerTitle: "REGISTRAR CLIENTE"
    }
  }
});

export default MainNavigator;
