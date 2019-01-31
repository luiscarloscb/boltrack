import React, { Component } from "react";
import {
  Card,
  CardItem,
  ListItem,
  List,
  Container,
  Content,
  Text,
  H3,
  Button
} from "native-base";
import escapeRegExp from "escape-string-regexp";
import { obtenerOrdenes, eliminarOrden } from "../utils/localStorageAPI";
import { registrarOrden } from "../utils/boltrackAPI";
import { SearchBar } from "../components";

export class ListaOrdenes extends Component {
  state = {
    ordenes: [],
    query: ""
  };
  componentDidMount() {
    this.cargarOrdenes();
  }
  setQuery = query => this.setState({ query });
  componentWillUpdate() {
    this.cargarOrdenes();
  }
  cargarOrdenes = async () => {
    this.setState({ ordenes: await obtenerOrdenes() });
  };
  filterArrayByQuery = arr => {
    const { CLIENTES } = this.props.navigation.state.params.DATA;
    const { query } = this.state;
    const items = arr.map(item => {
      let newItem;
      let clienteNom = CLIENTES.find(
        cliente => cliente.clienteID == item.IDCLIENTE
      );

      newItem = { ...item, CLIENTENOM: clienteNom.clienteNom };
      return newItem;
    });

    let showingItems;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      showingItems = items.filter(item => match.test(item.CLIENTENOM));
    } else {
      showingItems = items;
    }
    return showingItems;
  };
  subirAServidor = async arr => {
    try {
      let response;
      for (i = 0; i < arr.length; i++) {
        arr[i].token = this.props.navigation.state.params.TOKEN;
        response = await registrarOrden(arr[i]);
        if (response.subio) {
          console.log(response.subio);
          await eliminarOrden(arr[i].IDORDEN);
          alert("Todas las ordenes se registraron correctamente");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    return (
      <Container>
        <SearchBar
          value={this.state.query}
          onChangeText={this.setQuery}
          styles={{ marginTop: 10, height: 40 }}
        />

        <Content>
          <List
            dataArray={this.filterArrayByQuery(this.state.ordenes)}
            renderRow={orden => (
              <ListItem style={{ flex: 1 }}>
                <Card style={{ flex: 1 }}>
                  <CardItem>
                    <H3>Cliente: </H3>
                    <Text style={{ color: "black", fontSize: 13 }}>
                      {orden.CLIENTENOM.length < 30
                        ? orden.CLIENTENOM
                        : orden.CLIENTENOM.slice(0, 30)}
                    </Text>
                  </CardItem>
                  <CardItem>
                    <H3>Fecha Orden: </H3>
                    <Text style={{ color: "black", fontSize: 13 }}>
                      {orden.FECHAORDEN.toString().slice(0, 10)}
                    </Text>
                  </CardItem>
                  <CardItem>
                    <H3>Fecha Entrega:</H3>
                    <Text style={{ color: "black", fontSize: 13 }}>
                      {orden.FECHAENTREGA.toString().slice(0, 10)}
                    </Text>
                  </CardItem>
                </Card>
              </ListItem>
            )}
          />
        </Content>

        <Button
          onPress={() => this.subirAServidor(this.state.ordenes)}
          block
          style={{ margin: 15 }}
          disabled={this.state.ordenes.length === 0}
        >
          <Text>Subir a Servidor</Text>
        </Button>
      </Container>
    );
  }
}
