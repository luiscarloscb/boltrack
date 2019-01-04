import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button } from "../components/Button";
import { obtenerDato } from "../utils/localStorageAPI";

export class Opciones extends Component {
  PARAMS = {};
  async componentDidMount() {
    this.PARAMS.DATA = await obtenerDato("DATA");
    this.PARAMS.CONFIG = await obtenerDato("CONFIG");
    this.PARAMS.TOKEN = await obtenerDato("TOKEN");
  }
  render() {
    return (
      <View>
        <Button
          full
          success
          onPress={() =>
            this.props.navigation.navigate("CrearPlan", { ...this.PARAMS })
          }
        >
          Crear Plan de Visita
        </Button>
        <Button
          full
          success
          onPress={() =>
            this.props.navigation.navigate("ListarPlanes", { ...this.PARAMS })
          }
        >
          Planes de Visita
        </Button>
        <Button
          full
          success
          onPress={() =>
            this.props.navigation.navigate("ListarVisitas", { ...this.PARAMS })
          }
        >
          Visitas Realizadas
        </Button>
        <Button
          full
          success
          onPress={() =>
            this.props.navigation.navigate("InfoClientes", { ...this.PARAMS })
          }
        >
          Informacion Clientes
        </Button>
      </View>
    );
  }
}
