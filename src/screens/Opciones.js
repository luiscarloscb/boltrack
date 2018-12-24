import React from "react";
import { Text, View } from "react-native";
import { Button } from "../components/Button";

export const Opciones = props => {
  return (
    <View>
      <Button
        full
        success
        onPress={() => props.navigation.navigate("CrearPlan")}
      >
        Crear Plan de Visita
      </Button>
      <Button
        full
        success
        onPress={() => props.navigation.navigate("ListarPlanes")}
      >
        Planes de Visita
      </Button>
      <Button
        full
        success
        onPress={() => props.navigation.navigate("ListarVisitas")}
      >
        Visitas Realizadas
      </Button>
      <Button
        full
        success
        onPress={() => props.navigation.navigate("InfoClientes")}
      >
        Informacion Clientes
      </Button>
    </View>
  );
};
