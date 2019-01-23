import React, { Fragment, Component } from "react";
import { Catalogo } from "./Catalogo";
import { Input, Button, Icon } from "native-base";
import { SearchBar } from "./SearchBar";
export class InsumosPicker extends Component {
  state = { catalogoInsumos: false };
  toggleCatalogoInsumos = () =>
    this.setState(state => ({ catalogoInsumos: !state.catalogoInsumos }));
  render() {
    const { insumos, state, setters } = this.props;
    return (
      <Catalogo
        placeholder="Insumos"
        data={insumos}
        seleccionarItem={setters.setInsumo}
        toggleCatalogo={this.toggleCatalogoInsumos}
        visible={this.state.catalogoInsumos}
        label="insumoNombre"
        value="insumoID"
      >
        {resetOnSelect => (
          <Fragment>
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
              onPress={() => {
                setters.setInsumos();
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
