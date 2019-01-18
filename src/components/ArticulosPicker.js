import React, { Fragment } from "react";
import {
  Picker,
  Input,
  Button,
  Icon,
  Header,
  Body,
  Left,
  Right,
  Item
} from "native-base";
import { SearchBar } from "./SearchBar";
export const ArticulosPicker = ({ state, setters, renderPickerItem }) => (
  <Fragment>
    <Item>
      <Picker
        note
        mode="dropdown"
        style={{ width: 250 }}
        selectedValue={state.ARTICULO}
        onValueChange={value => {
          setters.resetQuery();
          setters.setArticulo(value);
        }}
        renderHeader={backAction => (
          <Header>
            <Left>
              <Button transparent onPress={backAction}>
                <Icon name="ios-arrow-back" style={{ color: "black" }} />
              </Button>
            </Left>
            <Body style={{ flex: 3 }}>
              <SearchBar value={state.query} onChangeText={setters.setQuery} />
            </Body>
            <Right />
          </Header>
        )}
        placeholder={"Articulos"}
      >
        {renderPickerItem()}
      </Picker>

      <Input
        value={state.CANTIDAD}
        onChangeText={setters.setCantidad}
        placeholder="Cantidad"
        keyboardType="numeric"
      />
    </Item>
    <Item>
      <Input
        value={state.PRECIOBASE}
        onChangeText={setters.setPrecioBase}
        placeholder="Precio Base"
        keyboardType="numeric"
      />
    </Item>
    <Item>
      <Input
        value={state.PRECIOSECUNDARIO}
        onChangeText={setters.setPrecioSecundario}
        placeholder="Precio Secundario 1"
        keyboardType="numeric"
      />
    </Item>
    <Item>
      <Input
        value={state.PRECIOSECUNDARIOOPT}
        onChangeText={setters.setPrecioSecundarioOpt}
        placeholder="Precio Secundario 2"
        keyboardType="numeric"
      />
    </Item>
    <Button
      success
      block
      style={{ alignContent: "center", margin: 5 }}
      onPress={setters.setArticulos}
    >
      <Icon name="ios-add" color="white" />
    </Button>
  </Fragment>
);
