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
  RegistrarCliente,
  CrearVisitaNoProgramada,
  UserInfo,
  CrearOrdenPedido
} from "./src/screens";

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
  CrearOrdenPedido: {
    screen: CrearOrdenPedido,
    navigationOptions: {
      headerTitle: "Orden Pedido"
    }
  },
  UserInfo: {
    screen: UserInfo,
    navigationOptions: {
      headerLeft: null,
      headerTitle: "USUARIO"
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
  CrearVisitaNoProgramada: {
    screen: CrearVisitaNoProgramada,
    navigationOptions: {
      headerTitle: "REGISTRAR VISITA"
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
