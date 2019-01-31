import React, { Component } from "react";
import {
  Content,
  Container,
  Card,
  Footer,
  FooterTab,
  Icon,
  Button,
  Text,
  Spinner
} from "native-base";
//import { Button } from "../components/Button";
import { Confirm } from "../components/Confirm";
import { obtenerDato } from "../utils/localStorageAPI";
import { eliminarDatos } from "../utils/localStorageAPI";

const buttonStyle = { margin: 10, minHeight: 48, minWidth: 100 };
export class Opciones extends Component {
  state = {
    mostrarConfirmacion: false,
    DATA: {},
    CONFIG: {},
    TOKEN: ""
  };
  toggleConfirmacion = () =>
    this.setState(state => ({
      mostrarConfirmacion: !state.mostrarConfirmacion
    }));
  async componentDidMount() {
    this.setState({
      DATA: await obtenerDato("DATA"),
      CONFIG: await obtenerDato("CONFIG"),
      TOKEN: await obtenerDato("TOKEN")
    });
  }
  desconectar = async () => {
    await eliminarDatos(["TOKEN", "DATA", "CONFIG", "PLANES", "ORDENES"]);
    this.props.navigation.navigate("Login");
  };
  render() {
    const { DATA, CONFIG, TOKEN } = this.state;
    if (Object.keys(DATA).length === 0) return <Spinner />;
    const PARAMS = {
      DATA,
      CONFIG,
      TOKEN
    };
    return (
      <Container style={{ backgroundColor: "#EEEEEE" }}>
        <Content style={{ paddingHorizontal: 10 }}>
          <Card>
            <Button
              style={buttonStyle}
              block
              success
              onPress={() =>
                this.props.navigation.navigate("RegistrarCliente", {
                  ...PARAMS
                })
              }
            >
              <Text>Registrar Cliente</Text>
            </Button>

            <Button
              style={buttonStyle}
              block
              success
              onPress={() =>
                this.props.navigation.navigate("CrearOrdenPedido", {
                  ...PARAMS
                })
              }
            >
              <Text>Crear Orden Pedido</Text>
            </Button>
            <Button
              style={buttonStyle}
              block
              success
              onPress={() =>
                this.props.navigation.navigate("ListaOrdenes", {
                  ...PARAMS
                })
              }
            >
              <Text>Ordenes</Text>
            </Button>
            <Button
              style={buttonStyle}
              block
              success
              onPress={() =>
                this.props.navigation.navigate("CrearPlan", { ...PARAMS })
              }
            >
              <Text>Crear Plan de Visita</Text>
            </Button>
            <Button
              style={buttonStyle}
              block
              success
              onPress={() =>
                this.props.navigation.navigate("CrearVisitaNoProgramada", {
                  ...PARAMS
                })
              }
            >
              <Text>Registrar Visita No Programada</Text>
            </Button>
            <Button
              style={buttonStyle}
              block
              success
              onPress={() =>
                this.props.navigation.navigate("ListarPlanes", {
                  ...PARAMS
                })
              }
              disabled={this.state.DATA.CLIENTES.length === 0}
            >
              <Text>Planes de Visita</Text>
            </Button>
            <Button
              style={buttonStyle}
              block
              success
              onPress={() =>
                this.props.navigation.navigate("ListarVisitas", {
                  ...PARAMS
                })
              }
              disabled={this.state.DATA.CLIENTES.length === 0}
            >
              <Text>Visitas Realizadas</Text>
            </Button>

            <Button
              style={buttonStyle}
              block
              success
              onPress={() =>
                this.props.navigation.navigate("InfoClientes", {
                  ...PARAMS
                })
              }
              disabled={this.state.DATA.CLIENTES.length === 0}
            >
              <Text>Informacion Clientes</Text>
            </Button>

            <Button
              style={buttonStyle}
              block
              danger
              onPress={this.toggleConfirmacion}
            >
              <Text>Desconectar</Text>
            </Button>
            <Confirm
              visible={this.state.mostrarConfirmacion}
              onAccept={this.desconectar}
              onDecline={this.toggleConfirmacion}
            >
              Estas Seguro de salir? Perderas todos los datos no guardados.
            </Confirm>
          </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical active onPress={() => {}}>
              <Icon name="ios-apps" />
            </Button>
            <Button
              vertical
              onPress={() =>
                this.props.navigation.navigate("UserInfo", { ...PARAMS })
              }
            >
              <Icon name="ios-person" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
