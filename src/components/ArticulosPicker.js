import React, { Fragment, Component } from "react";
import { Input, Button, Icon, Item } from "native-base";
import { Catalogo } from "./Catalogo";
export class ArticulosPicker extends Component {
  state = { catalogoInsumos: false };
  toggleCatalogoInsumos = () =>
    this.setState(state => ({ catalogoInsumos: !state.catalogoInsumos }));
  render() {
    const { insumos, state, setters, renderPickerItem } = this.props;

    return (
      <Catalogo
        placeholder="Insumos"
        data={insumos}
        seleccionarItem={setters.setArticulo}
        toggleCatalogo={this.toggleCatalogoInsumos}
        visible={this.state.catalogoInsumos}
        label="insumoNombre"
        value="insumoID"
      >
        {resetOnSelect => (
          <Fragment>
            <Item style={{ flex: 3 }}>
              <Input
                value={state.CANTIDAD}
                onChangeText={setters.setCantidad}
                placeholder="Cantidad"
                keyboardType="numeric"
              />

              <Input
                value={state.PRECIOBASE}
                onChangeText={setters.setPrecioBase}
                placeholder="Precio Base"
                keyboardType="numeric"
              />

              <Button
                success
                block
                style={{ alignContent: "center", margin: 5 }}
                onPress={() => {
                  setters.setArticulos();
                  resetOnSelect();
                }}
              >
                <Icon name="ios-add" />
              </Button>
            </Item>
          </Fragment>
        )}
      </Catalogo>
    );
  }
}
