import React, { Component, Fragment } from "react";
import {
  Content,
  Container,
  Item,
  Input,
  Picker,
  DatePicker,
  Card,
  Text,
  Header,
  Body,
  Right,
  Left,
  Button,
  Icon
} from "native-base";
import { FormOrdenPedido } from "../components/FormOrdenPedido";
import { ArticulosPicker } from "../components/ArticulosPicker";
import { SearchBar } from "../components/SearchBar";
import { ListaArticulos } from "../components/ListaArticulos";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";

export class CrearOrdenPedido extends Component {
  state = { query: "" };

  setQuery = query => this.setState({ query });
  resetQuery = () => this.setState({ query: "" });

  filterArrayByQuery = (arr, keys) => {
    const { query } = this.state;

    let showingItems;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      showingItems = arr.filter(item => match.test(item[keys[1]]));
    } else {
      showingItems = arr;
    }

    return showingItems.sort(sortBy(keys[1]));
  };
  renderPickerItem = (arr, keys) => {
    // Renderiza las opciones disponibles de un array de objectos [{ID, NOMBRE}]
    const showingItems = this.filterArrayByQuery(arr, keys);
    return showingItems.length > 0 ? (
      showingItems.map(item => (
        <Picker.Item
          key={item[keys[1]]}
          label={item[keys[1]]}
          value={item[keys[0]]}
        />
      ))
    ) : (
      <Picker.Item label="NO TIENE ASSIGNADO NINGUN ITEM" value={""} />
    );
  };
  render() {
    const { CLIENTES, INSUMOS } = this.props.navigation.state.params.DATA;
    return (
      <Container style={{ backgroundColor: "#EEEEEE" }}>
        <Content style={{ paddingHorizontal: 10 }}>
          <Card>
            <FormOrdenPedido clientes={CLIENTES}>
              {(state, setters) => (
                <Fragment>
                  <Item>
                    <Picker
                      note
                      mode="dropdown"
                      style={{ width: 250 }}
                      selectedValue={state.IDCLIENTE}
                      onValueChange={value => {
                        this.resetQuery();
                        setters.setCliente(value);
                      }}
                      placeholder={"Cliente"}
                      renderHeader={backAction => (
                        <Header>
                          <Left>
                            <Button transparent onPress={backAction}>
                              <Icon
                                name="ios-arrow-back"
                                style={{ color: "black" }}
                              />
                            </Button>
                          </Left>
                          <Body style={{ flex: 3 }}>
                            <SearchBar
                              value={this.state.query}
                              onChangeText={this.setQuery}
                            />
                          </Body>
                          <Right />
                        </Header>
                      )}
                    >
                      {this.renderPickerItem(CLIENTES, [
                        "clienteID",
                        "clienteNom"
                      ])}
                    </Picker>
                  </Item>
                  <Item>
                    <Picker
                      note
                      mode="dropdown"
                      style={{ width: 250 }}
                      selectedValue={state.IDSUCURSAL}
                      onValueChange={value => {
                        this.resetQuery();
                        setters.setSucursal(value);
                      }}
                      renderHeader={backAction => (
                        <Header>
                          <Left>
                            <Button transparent onPress={backAction}>
                              <Icon
                                name="ios-arrow-back"
                                style={{ color: "black" }}
                              />
                            </Button>
                          </Left>
                          <Body style={{ flex: 3 }}>
                            <SearchBar
                              value={this.state.query}
                              onChangeText={this.setQuery}
                            />
                          </Body>
                          <Right />
                        </Header>
                      )}
                      placeholder={"Sucursal"}
                    >
                      {this.renderPickerItem(state.sucursales, [
                        "sucursalId",
                        "sucursalNom"
                      ])}
                    </Picker>
                  </Item>
                  <Item>
                    <DatePicker
                      defaultDate={new Date()}
                      minimumDate={new Date()}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"Fecha de la orden"}
                      textStyle={{ color: "green" }}
                      placeHolderTextStyle={{ color: "#d3d3d3" }}
                      onDateChange={setters.setFechaOrden}
                    />
                    <Text>
                      Fecha de la orden:{" "}
                      {state.FECHAORDEN.toString().substr(4, 12)}
                    </Text>
                  </Item>
                  <Item>
                    <Picker
                      note
                      mode="dropdown"
                      style={{ width: 250 }}
                      selectedValue={state.FORMAPAGO}
                      onValueChange={value => {
                        this.resetQuery();
                        setters.setFormaPago(value);
                      }}
                      renderHeader={backAction => (
                        <Header>
                          <Left>
                            <Button transparent onPress={backAction}>
                              <Icon
                                name="ios-arrow-back"
                                style={{ color: "black" }}
                              />
                            </Button>
                          </Left>
                          <Body style={{ flex: 3 }}>
                            <SearchBar
                              value={this.state.query}
                              onChangeText={this.setQuery}
                            />
                          </Body>
                          <Right />
                        </Header>
                      )}
                      placeholder={"Forma de Pago"}
                    >
                      <Picker.Item
                        key={1}
                        label={"Efectivo"}
                        value={"Efectivo"}
                      />
                      <Picker.Item
                        key={2}
                        label={"Credito"}
                        value={"Credito"}
                      />
                      <Picker.Item key={3} label={"Cuotas"} value={"Cuotas"} />
                    </Picker>
                  </Item>
                  <Item>
                    <Input
                      value={state.CUOTAS}
                      onChangeText={setters.setCuotas}
                      placeholder="Cuotas"
                      keyboardType="numeric"
                    />
                  </Item>
                  <ArticulosPicker
                    state={{ ...state, query: this.state.query }}
                    setters={{ ...setters, resetQuery: this.resetQuery }}
                    renderPickerItem={() =>
                      this.renderPickerItem(INSUMOS, [
                        "insumoID",
                        "insumoNombre"
                      ])
                    }
                  />
                  <Item>
                    <ListaArticulos insumos={INSUMOS} data={state.ARTICULOS} />
                  </Item>
                </Fragment>
              )}
            </FormOrdenPedido>
          </Card>
        </Content>
      </Container>
    );
  }
}

// ***Orden de Pedido
// * Cliente
// * Sucursal
// * Fecha generacion de Orden (fecha actual por defecto pero que deje escoger)
// * Forma de pago (Efectivo/Credito/Cuotas (Nro. de Cuotas))
// * Articulos o Servicios ( [nombre, cantidad, precioBase/precio1/precio2] )
// * Fecha comprometida de entrega
