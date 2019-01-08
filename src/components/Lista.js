import React, { Component } from "react";
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Right,
  Body,
  Icon,
  Button,
  Card,
  CardItem
} from "native-base";
import { cakeGreen, pale } from "../utils/colors";
import { formatearVisitaPlaneada } from "../utils/helpers";
import { obtenerPlanesLocal } from "../utils/localStorageAPI";

export class Lista extends Component {
  state = { visitas: [] };
  async componentDidMount() {
    // Fusionando visitas en localStorage con visitas en API.
    const { VISITASPLANEADAS } = this.props.data;
    const VISITASLOCALES = await obtenerPlanesLocal();
    this.setState({ visitas: [...VISITASPLANEADAS, ...VISITASLOCALES] });
  }

  render() {
    const { CLIENTES, TEMAVISITAS } = this.props.data;
    const { visitasCompletadas, renderOptions } = this.props;
    const { visitas } = this.state;
    return (
      <Container>
        <List
          dataArray={
            visitasCompletadas
              ? visitas.filter(v => v.ESTADO === "COMPLETADA")
              : visitas
          }
          renderRow={visita => (
            <Card>
              <CardItem
                style={{
                  backgroundColor:
                    visita.ESTADO == "COMPLETADA" ? cakeGreen : pale
                }}
              >
                <Body>
                  <Text style={{ color: "black" }}>
                    {formatearVisitaPlaneada(visita, CLIENTES, TEMAVISITAS)}
                  </Text>
                </Body>
              </CardItem>
              <CardItem style={{ flexDirection: "row" }}>
                {renderOptions(visita)}
              </CardItem>
            </Card>
          )}
        />
      </Container>
    );
  }
}
