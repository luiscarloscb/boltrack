import React, { Component, Fragment } from "react";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";
import {
  Item,
  Picker,
  Header,
  Left,
  Body,
  Right,
  Icon,
  Card,
  Content,
  Container
} from "native-base";
import { Button } from "../components/Button";
import { SearchBar } from "../components/SearchBar";
import { FormVisitaNoProgramada } from "../components/FormVisitaNoProgramada";
export class CrearVisitaNoProgramada extends Component {
  state = {
    query: ""
  };
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
            <FormVisitaNoProgramada
              INSUMOS={INSUMOS}
              CLIENTES={CLIENTES}
              goBack={this.props.navigation.goBack}
            >
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
                </Fragment>
              )}
            </FormVisitaNoProgramada>
          </Card>
        </Content>
      </Container>
    );
  }
}
