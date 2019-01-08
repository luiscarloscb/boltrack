import React, { Component } from "react";
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
import { formatearVisitaPlaneada } from "../utils/helpers";
import { obtenerPlanesLocal } from "../utils/localStorageAPI";

export class Lista extends Component {
  state = { visitas: [] };
  async componentDidMount() {
    const { VISITASPLANEADAS } = this.props.data;
    const VISITASLOCALES = await obtenerPlanesLocal();
    this.setState({ visitas: [...VISITASPLANEADAS, ...VISITASLOCALES] });
  }
  render() {
    const { CLIENTES, TEMAVISITAS } = this.props.data;
    return (
      <Container>
        <List
          dataArray={this.state.visitas}
          renderRow={visita => (
            <ListItem
              style={{
                backgroundColor:
                  visita.ESTADO == "COMPLETADA" ? cakeGreen : pale
              }}
            >
              <Body>
                <Text>
                  {formatearVisitaPlaneada(visita, CLIENTES, TEMAVISITAS)}
                </Text>
              </Body>
              <Right>{this.props.renderOptions(visita)}</Right>
            </ListItem>
          )}
        />
      </Container>
    );
  }
}
