import React, { Fragment } from "react";
import {
  Picker,
  Input,
  Button,
  Icon,
  Header,
  Body,
  Left,
  Right
} from "native-base";
import { SearchBar } from "./SearchBar";
export const InsumosPicker = ({ state, setters, renderPickerItem }) => (
  <Fragment>
    <Picker
      note
      mode="dropdown"
      style={{ width: 250 }}
      selectedValue={state.insumo}
      onValueChange={value => {
        setters.resetQuery();
        setters.setInsumo(value);
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
      placeholder={"Insumos"}
    >
      {renderPickerItem()}
    </Picker>

    <Input
      value={state.cantidad}
      onChangeText={setters.setCantidad}
      placeholder="Cantidad"
      keyboardType="numeric"
    />

    <Button
      success
      block
      style={{ alignContent: "center", margin: 5 }}
      onPress={setters.setInsumos}
    >
      <Icon name="ios-add" color="white" />
    </Button>
  </Fragment>
);
