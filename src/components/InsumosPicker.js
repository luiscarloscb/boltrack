import React, { Fragment } from "react";
import { Picker, Input, Button, Icon, Header, Body } from "native-base";
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
          <Body style={{ flex: 1 }}>
            <SearchBar value={state.query} onChangeText={setters.setQuery} />
          </Body>
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
      style={{ alignContent: "center" }}
      onPress={setters.setInsumos}
    >
      <Icon name="ios-add" color="white" />
    </Button>
  </Fragment>
);
