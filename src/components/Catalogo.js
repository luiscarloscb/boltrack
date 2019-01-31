import React, { Component, Fragment } from "react";
import { Modal } from "react-native";
import {
  Card,
  CardItem,
  Text,
  Button,
  List,
  ListItem,
  Body,
  Left,
  Right,
  Icon
} from "native-base";
import { SearchBar } from "./SearchBar";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";

export class Catalogo extends Component {
  state = { query: "", itemSeleccionado: "" };
  resetItemSeleccionado = () => this.setState({ itemSeleccionado: "" });
  setQuery = query => this.setState({ query });
  setItem = itemSeleccionado => this.setState({ itemSeleccionado });
  filterArrayByQuery = (arr, filterProp, sortProp) => {
    const { query } = this.state;

    let showingItems;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      showingItems = arr.filter(item => match.test(item[filterProp]));
    } else {
      showingItems = arr;
    }
    return showingItems;
  };
  render() {
    const {
      data,
      seleccionarItem,
      toggleCatalogo,
      visible,
      placeholder,
      label,
      value,
      resetOnSelect,
      children
    } = this.props;
    const { query, itemSeleccionado } = this.state;
    if (data.length <= 0) return null;

    return (
      <Fragment>
        <Button onPress={toggleCatalogo} transparent style={{ flex: 1 }}>
          <Text>{itemSeleccionado ? itemSeleccionado : placeholder}</Text>
        </Button>
        {children && children(this.resetItemSeleccionado)}
        <Modal
          animationType="slide"
          onRequestClose={() => {}}
          visible={visible}
          presentationStyle="fullScreen"
        >
          <Card
            transparent
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              position: "relative",
              justifyContent: "center",
              marginTop: 50
            }}
          >
            <CardItem>
              <Left>
                <Button transparent onPress={toggleCatalogo}>
                  <Icon
                    name="ios-arrow-back"
                    style={{ fontSize: 30, color: "gray" }}
                  />
                </Button>
              </Left>
              <Body style={{ flex: 3 }}>
                <SearchBar query={query} onChangeText={this.setQuery} />
              </Body>
              <Right />
            </CardItem>
            <CardItem>
              <List
                dataArray={this.filterArrayByQuery(data, label, label)}
                renderRow={item => (
                  <ListItem style={{ flex: 1 }}>
                    <Button
                      transparent
                      onPress={() => {
                        this.setItem(item[label]);
                        seleccionarItem(item[value]);
                        toggleCatalogo();
                      }}
                    >
                      <Text>{item[label]}</Text>
                    </Button>
                  </ListItem>
                )}
              />
            </CardItem>
          </Card>
        </Modal>
      </Fragment>
    );
  }
}
