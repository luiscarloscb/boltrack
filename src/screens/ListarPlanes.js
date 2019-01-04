import React from "react";
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Right,
  Body,
  Icon
} from "native-base";
import { cakeGreen, pale } from "../utils/colors";
import { Button } from "../components/Button";
const convertTime = unix_timestamp => {
  const a = new Date(unix_timestamp);
  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  return `${date} ${month} ${year}`;
};

const formatearVisitaPlaneada = (VISITA, CLIENTES, TEMAVISITAS) => {
  const { clienteNom, sucursales } = CLIENTES.find(
    item => item.clienteID == VISITA.IDCLIENTE
  );
  const { sucursalNom, sucursalContacto } = sucursales.find(
    item => item.sucursalId == VISITA.IDSUCURSAL
  );
  const { temaNombre } = TEMAVISITAS.find(
    item => item.temaID == VISITA.IDTEMAVISITA
  );
  return `
  NOMBRE CLIENTE: ${clienteNom} \n
  SUCURSAL: ${sucursalNom} \n
  CONTACTO: ${sucursalContacto} \n
  FECHA PLANEADA: ${convertTime(VISITA.FECHAPLANIFICADA)} \n
  TEMA VISITA: ${temaNombre}
  `;
};

export const ListarPlanes = props => {
  console.log(props.navigation.state.params.DATA);
  const {
    VISITASPLANEADAS,
    CLIENTES,
    TEMAVISITAS
  } = props.navigation.state.params.DATA;
  return (
    <Container>
      <List
        dataArray={VISITASPLANEADAS}
        renderRow={visita => (
          <ListItem
            style={{
              backgroundColor: visita.ESTADO == "COMPLETADA" ? cakeGreen : pale
            }}
          >
            <Body>
              <Text>
                {formatearVisitaPlaneada(visita, CLIENTES, TEMAVISITAS)}
              </Text>
            </Body>
            <Right>
              {visita.ESTADO == "PENDIENTE" && (
                <Button
                  success
                  style={{ alignContent: "center" }}
                  onPress={() => {}}
                >
                  <Icon name="ios-add" color="white" />
                </Button>
              )}
              <Button
                danger
                style={{ alignContent: "center" }}
                onPress={() => {}}
              >
                <Icon name="ios-remove" color="white" />
              </Button>
            </Right>
          </ListItem>
        )}
      />
    </Container>
  );
};
