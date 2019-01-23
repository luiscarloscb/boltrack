import React, { Component, Fragment } from "react";
import { Catalogo, FormOrdenPedido } from "../components";
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
import { ArticulosPicker } from "../components/ArticulosPicker";
import { SearchBar } from "../components/SearchBar";
import { ListaArticulos } from "../components/ListaArticulos";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";

export class CrearOrdenPedido extends Component {
  state = {
    query: "",
    catalogoClientes: false,
    catalogoSucursales: false,
    catalogoFormasDePago: false
  };
  toggleCatalogo = catalogo =>
    this.setState(state => ({ [catalogo]: !state[catalogo] }));

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
                    <Catalogo
                      placeholder="Cliente"
                      data={CLIENTES}
                      seleccionarItem={setters.setCliente}
                      toggleCatalogo={() =>
                        this.toggleCatalogo("catalogoClientes")
                      }
                      visible={this.state.catalogoClientes}
                      label="clienteNom"
                      value="clienteID"
                    />
                  </Item>
                  <Item>
                    <Catalogo
                      placeholder="Sucursales"
                      data={state.sucursales}
                      seleccionarItem={setters.setSucursal}
                      toggleCatalogo={() =>
                        this.toggleCatalogo("catalogoSucursales")
                      }
                      visible={this.state.catalogoSucursales}
                      label="sucursalNom"
                      value="sucursalId"
                    />
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
                    <Catalogo
                      placeholder="Tipo de Pago"
                      data={[
                        { formaPagoNom: "Efectivo", formaPagoId: 1 },
                        { formaPagoNom: "Credito", formaPagoId: 2 },
                        { formaPagoNom: "Cuotas", formaPagoId: 3 }
                      ]}
                      seleccionarItem={setters.setFormaPago}
                      toggleCatalogo={() =>
                        this.toggleCatalogo("catalogoFormasDePago")
                      }
                      visible={this.state.catalogoFormasDePago}
                      label="formaPagoNom"
                      value="formaPagoId"
                    />
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
                    insumos={INSUMOS}
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

// articulos - modificar - eliminar 1 - eliminar todos.

//correos adicinal.
