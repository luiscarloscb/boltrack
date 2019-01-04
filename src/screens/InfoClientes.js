import React from "react";
import { Container, Content, List, ListItem, Text } from "native-base";

const formatearClienteInfo = CLIENTE => {
  const {
    clienteID,
    clienteNom,
    fechaUltimaVisita,
    resultadosUltimaVisita
  } = CLIENTE;
  return `
  # CLIENTE: ${clienteID} \n
  CLIENTE NOMBRE: ${clienteNom} \n
  FECHA ULTIMA VISITA: ${fechaUltimaVisita} \n
  RESULTADOS ULTIMA VISITA: ${resultadosUltimaVisita} \n
  `;
};

export const InfoClientes = props => {
  const { CLIENTES } = props.navigation.state.params.DATA;
  return (
    <Container>
      <List
        dataArray={CLIENTES}
        renderRow={cliente => (
          <ListItem>
            <Text>{formatearClienteInfo(cliente)}</Text>
          </ListItem>
        )}
      />
    </Container>
  );
};
