import React from "react";
import { Item, Icon, Input } from "native-base";

export const SearchBar = ({ query, onChangeText, styles }) => (
  <Item rounded style={{ backgroundColor: "white", height: 35, ...styles }}>
    <Icon name="ios-search" />
    <Input
      placeholder="Buscar"
      width={250}
      value={query}
      onChangeText={onChangeText}
    />
  </Item>
);
