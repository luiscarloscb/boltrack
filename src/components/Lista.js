import React, { Component } from "react";
import { Container, List, Text, Body, Card, CardItem } from "native-base";
import { cakeGreen, pale } from "../utils/colors";
import { formatearVisitaPlaneada } from "../utils/helpers";
import { obtenerPlanesLocal } from "../utils/localStorageAPI";
import { SearchBar } from "./SearchBar";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";
export class Lista extends Component {
  state = { visitas: [], query: "" };

  setQuery = query => this.setState({ query });
  resetQuery = () => this.setState({ query: "" });

  filterArrayByQuery = (arr, keys) => {
    const { CLIENTES } = this.props.data;
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
      showingItems = arr;
    }

    return showingItems.sort(sortBy("CLIENTENOM"));
  };
  cargarVisitas = async () => {
    // Fusionando visitas en localStorage con visitas en API.
    const { VISITASPLANEADAS } = this.props.data;
    const VISITASLOCALES = await obtenerPlanesLocal();
    this.setState({ visitas: [...VISITASPLANEADAS, ...VISITASLOCALES] });
  };
  async componentDidMount() {
    this.cargarVisitas();
  }
  async componentWillUpdate() {
    this.cargarVisitas();
  }

  sortByEstado = arr => {
    return arr.sort((a, b) => {
      if (a.ESTADO < b.ESTADO) {
        return 1;
      }
      if (a.ESTADO > b.ESTADO) {
        return -1;
      }
      return 0;
    });
  };
  render() {
    const { CLIENTES, TEMAVISITAS } = this.props.data;
    const { visitasCompletadas, renderOptions } = this.props;
    const visitas = this.filterArrayByQuery(this.state.visitas);

    return (
      <Container style={{ backgroundColor: "#EEEEEE" }}>
        <SearchBar
          value={this.state.query}
          onChangeText={this.setQuery}
          styles={{ marginTop: 10, height: 40 }}
        />
        <List
          dataArray={
            visitasCompletadas
              ? visitas.filter(v => v.ESTADO === "COMPLETADA")
              : this.sortByEstado(visitas)
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
