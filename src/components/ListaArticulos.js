import React from "react";
import { List, ListItem, Text, Icon, Button } from "native-base";
export const ListaArticulos = ({ data, insumos, onDelete }) => (
  <List
    dataArray={data}
    renderRow={item => (
      <ListItem
        style={{
          flex: 4,
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Text>
          {
            insumos.find(insumo => insumo.insumoID == item.articuloID)
              .insumoNombre
          }
        </Text>
        <Text>{item.cantidad}</Text>
        <Text>{item.precioBase}</Text>
        <Button danger small onPress={() => onDelete(item.articuloID)}>
          <Icon name="ios-remove" />
        </Button>
      </ListItem>
    )}
  />
);
