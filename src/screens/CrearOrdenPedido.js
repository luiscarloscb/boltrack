import React, { Component, Fragment } from "react";
import { FORMA_PAGO_DATA, CAMPANA_DATA } from "../utils/const";
import {
  Catalogo,
  FormOrdenPedido,
  PreOrden,
  ArticulosPicker,
  ListaArticulos
} from "../components";
import {
  Content,
  Container,
  Item,
  Input,
  DatePicker,
  Card,
  Text,
  Button
} from "native-base";

export class CrearOrdenPedido extends Component {
  state = {
    query: "",
    catalogoClientes: false,
    catalogoSucursales: false,
    catalogoFormasDePago: false,
    preOrden: false,
    catalogoCampanas: false,
    catalogoCorreos: false
  };
  toggleCatalogo = catalogo =>
    this.setState(state => ({ [catalogo]: !state[catalogo] }));

  render() {
    const {
      CLIENTES,
      INSUMOS,
      CAMPANAS
    } = this.props.navigation.state.params.DATA;
    return (
      <Container style={{ backgroundColor: "#EEEEEE" }}>
        <Content style={{ paddingHorizontal: 10 }}>
          <Card>
            <FormOrdenPedido CLIENTES={CLIENTES} INSUMOS={INSUMOS}>
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
                    <Catalogo
                      placeholder="Campaña"
                      data={CAMPANAS}
                      seleccionarItem={setters.setCampana}
                      toggleCatalogo={() =>
                        this.toggleCatalogo("catalogoCampanas")
                      }
                      visible={this.state.catalogoCampanas}
                      label="campanaNombre"
                      value="campanaID"
                    />
                  </Item>
                  <Item>
                    <DatePicker
                      defaultDate={new Date()}
                      minimumDate={new Date()}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      textStyle={{ color: "green" }}
                      placeHolderTextStyle={{ color: "#d3d3d3" }}
                      onDateChange={setters.setFechaOrden}
                    />
                    <Text>
                      Fecha orden:
                      {state.FECHAORDEN.toString().substr(4, 12)}
                    </Text>
                  </Item>
                  <Item>
                    <DatePicker
                      defaultDate={new Date()}
                      minimumDate={new Date()}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      textStyle={{ color: "green" }}
                      placeHolderTextStyle={{ color: "#d3d3d3" }}
                      onDateChange={setters.setFechaEntrega}
                    />
                    <Text>
                      Fecha Entrega:
                      {state.FECHAENTREGA.toString().substr(4, 12)}
                    </Text>
                  </Item>
                  <Item>
                    <Catalogo
                      placeholder="Tipo de Pago"
                      data={FORMA_PAGO_DATA}
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
                  <Item>
                    <Input
                      value={state.CORREOOPT}
                      onChangeText={setters.setCorreoOpt}
                      placeholder="Correo Opcional"
                    />
                  </Item>
                  <ArticulosPicker
                    state={{ ...state, query: this.state.query }}
                    setters={{ ...setters, resetQuery: this.resetQuery }}
                    insumos={INSUMOS}
                  />
                  <Item>
                    <ListaArticulos
                      insumos={INSUMOS}
                      data={state.ARTICULOS}
                      onDelete={setters.eliminarArticulo}
                    />
                  </Item>
                  <PreOrden
                    INSUMOS={INSUMOS}
                    CLIENTES={CLIENTES}
                    orden={state}
                    visible={this.state.preOrden}
                    OnToggle={() => this.toggleCatalogo("preOrden")}
                  />

                  <Button onPress={setters.onSave} success block>
                    <Text>Guardar Orden</Text>
                  </Button>
                </Fragment>
              )}
            </FormOrdenPedido>
          </Card>
        </Content>
      </Container>
    );
  }
}
