import React from "react";
import { List, ListItem, Text } from "native-base";
export const ListaArticulos = ({ data, insumos }) => (
  <List
    dataArray={data}
    renderRow={item => (
      <ListItem>
        <Text>
          {"NOM: " +
            insumos.find(insumo => insumo.insumoID == item.articuloID)
              .insumoNombre +
            "    " +
            "CANT: " +
            item.cantidad.toString() +
            "    " +
            "PRECIO BASE: " +
            item.precioBase.toString() +
            "    "}
        </Text>
      </ListItem>
    )}
  />
);
