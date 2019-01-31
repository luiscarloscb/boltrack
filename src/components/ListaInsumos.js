import React from "react";
import { List, ListItem, Text } from "native-base";

export const ListaInsumos = ({ data, insumos }) => (
  <List
    dataArray={data}
    renderRow={item => (
      <ListItem>
        <Text>
          {insumos.find(insumo => insumo.insumoID == item.insumoID)
            .insumoNombre +
            " ---------> " +
            item.cantidad.toString()}
        </Text>
      </ListItem>
    )}
  />
);
