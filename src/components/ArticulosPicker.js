import React, { Fragment, Component } from "react";
import { Input, Button, Icon, Item } from "native-base";
import { Catalogo } from "../components";
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
            <Item>
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

            <Button
              success
              block
              style={{ alignContent: "center", margin: 5 }}
              onPress={() => {
                setters.setArticulos();
                resetOnSelect();
              }}
            >
              <Icon name="ios-add" color="white" />
            </Button>
          </Fragment>
        )}
      </Catalogo>
    );
  }
}
