import React, { Component, Fragment } from "react";
import { Catalogo, FormVisitaNoProgramada } from "../components";
import { Item, Card, Content, Container } from "native-base";

export class CrearVisitaNoProgramada extends Component {
  state = {
    catalogoClientes: false,
    catalogoSucursales: false
  };

  toggleCatalogo = catalogo =>
    this.setState(state => ({ [catalogo]: !state[catalogo] }));
  render() {
    const { CLIENTES, INSUMOS } = this.props.navigation.state.params.DATA;
    return (
      <Container style={{ backgroundColor: "#EEEEEE" }}>
        <Content style={{ paddingHorizontal: 10 }}>
          <Card>
            <FormVisitaNoProgramada
              INSUMOS={INSUMOS}
              CLIENTES={CLIENTES}
              goBack={this.props.navigation.goBack}
            >
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
                </Fragment>
              )}
            </FormVisitaNoProgramada>
          </Card>
        </Content>
      </Container>
    );
  }
}
