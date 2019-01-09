import React, { Component } from "react";
import {
  Container,
  List,
  ListItem,
  Card,
  CardItem,
  Body,
  Text
} from "native-base";
import { SearchBar } from "../components/SearchBar";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";
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

export class InfoClientes extends Component {
  state = {
    query: ""
  };
  filterArrayByQuery = () => {
    const { query } = this.state;
    const { CLIENTES } = this.props.navigation.state.params.DATA;
    let showingItems;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      showingItems = CLIENTES.filter(cliente => match.test(cliente.clienteNom));
    } else {
      showingItems = CLIENTES;
    }

    return showingItems.sort(sortBy("clienteNom"));
  };
  setQuery = query => this.setState({ query });

  render() {
    const clientes = this.filterArrayByQuery();
    return (
      <Container style={{ backgroundColor: "#EEEEEE" }}>
        <SearchBar
          value={this.state.query}
          onChangeText={this.setQuery}
          styles={{ marginTop: 10, height: 40 }}
        />
        <List
          dataArray={clientes}
          renderRow={cliente => (
            <ListItem style={{ flex: 1 }}>
              <Card style={{ flex: 1 }}>
                <CardItem>
                  <Body>
                    <Text>{formatearClienteInfo(cliente)}</Text>
                  </Body>
                </CardItem>
              </Card>
            </ListItem>
          )}
        />
      </Container>
    );
  }
}
