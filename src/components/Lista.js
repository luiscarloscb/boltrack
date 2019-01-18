import React, { Component, Fragment } from "react";
import {
  Container,
  List,
  ListItem,
  Text,
  Body,
  Card,
  CardItem,
  Tabs,
  Tab,
  Spinner
} from "native-base";
import { cakeGreen, pale, red } from "../utils/colors";
import { formatearVisitaPlaneada } from "../utils/helpers";
import { obtenerPlanesLocal } from "../utils/localStorageAPI";
import { SearchBar } from "./SearchBar";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";
export class Lista extends Component {
  state = { visitas: [], query: "" };

  setQuery = query => this.setState({ query });
  resetQuery = () => this.setState({ query: "" });
  componentWillUnmount = () => this.setState({ visitas: [], query: "" });
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
    VISITASPLANEADAS.forEach(item => {
      item.CARGADO = true;
    });
    VISITASLOCALES.forEach(item => {
      item.CARGADO = false;
    });
    this.setState({ visitas: [...VISITASPLANEADAS, ...VISITASLOCALES] });
  };
  async componentDidMount() {
    this.cargarVisitas();
  }
  async componentWillUpdate() {
    this.cargarVisitas();
  }

  obtenerColor = visita => {
    if (visita.ESTADO == "COMPLETADA") {
      return cakeGreen;
    } else if (visita.ESTADO == "PENDIENTE") {
      if (visita.FECHAPLANIFICADA < new Date()) {
        return red;
      } else {
        return pale;
      }
    }
  };
  renderVisitas = cb => {
    const { CLIENTES, TEMAVISITAS } = this.props.data;
    const visitas = cb(this.filterArrayByQuery(this.state.visitas));
    const { renderOptions, estado } = this.props;
    if (!Array.isArray(visitas)) return <Spinner />;
    return (
      <Fragment>
        <SearchBar
          value={this.state.query}
          onChangeText={this.setQuery}
          styles={{ marginTop: 10, height: 40 }}
        />
        <List
          dataArray={visitas.filter(visita => visita.ESTADO === estado)}
          renderRow={visita => (
            <ListItem style={{ flex: 1 }}>
              <Card style={{ flex: 1 }}>
                <CardItem
                  style={{
                    backgroundColor: this.obtenerColor(visita)
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
            </ListItem>
          )}
        />
      </Fragment>
    );
  };
  ordenarPorNuevas = visitas =>
    visitas.sort((a, b) => b.FECHAPLANIFICADA - a.FECHAPLANIFICADA);
  mostrarVencidas = visitas =>
    visitas.filter(a => a.FECHAPLANIFICADA < new Date());
  mostrarLocales = visitas => visitas.filter(a => !a.CARGADO);
  render() {
    return (
      <Container style={{ backgroundColor: "#EEEEEE" }}>
        <Tabs>
          <Tab heading="Todas">{this.renderVisitas(this.ordenarPorNuevas)}</Tab>
          <Tab heading="Vencidas">
            {this.renderVisitas(this.mostrarVencidas)}
          </Tab>
          <Tab heading="Local">{this.renderVisitas(this.mostrarLocales)}</Tab>
        </Tabs>
      </Container>
    );
  }
}
