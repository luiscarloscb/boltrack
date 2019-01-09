import React from "react";
import { List, ListItem, Text } from "native-base";
export const ListaInsumos = ({ data, insumos }) => (
  <List
    dataArray={data}
    renderRow={item => (
      <ListItem>
        <Text>
          {"NOMBRE: " +
            insumos.find(insumo => insumo.insumoID == item.insumoID)
              .insumoNombre +
            "    " +
            "CANTIDAD: " +
            item.cantidad.toString()}
        </Text>
      </ListItem>
    )}
  />
);
