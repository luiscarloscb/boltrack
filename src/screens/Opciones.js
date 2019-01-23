import React, { Component } from "react";
import {
  Content,
  Container,
  Card,
  Footer,
  FooterTab,
  Icon,
  Button,
  Text
} from "native-base";
//import { Button } from "../components/Button";
import { Confirm } from "../components/Confirm";
import { obtenerDato } from "../utils/localStorageAPI";
import { eliminarDatos } from "../utils/localStorageAPI";

const buttonStyle = { margin: 10, minHeight: 48, minWidth: 100 };
export class Opciones extends Component {
  PARAMS = {};
  state = {
    mostrarConfirmacion: false
  };
  toggleConfirmacion = () =>
    this.setState(state => ({
      mostrarConfirmacion: !state.mostrarConfirmacion
    }));
  async componentDidMount() {
    this.PARAMS.DATA = await obtenerDato("DATA");
    this.PARAMS.CONFIG = await obtenerDato("CONFIG");
    this.PARAMS.TOKEN = await obtenerDato("TOKEN");
  }
  desconectar = async () => {
    await eliminarDatos(["TOKEN", "DATA", "CONFIG", "PLANES"]);
    this.props.navigation.navigate("Login");
  };
  render() {
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
                  ...this.PARAMS
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
                  ...this.PARAMS
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
                this.props.navigation.navigate("CrearPlan", { ...this.PARAMS })
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
                  ...this.PARAMS
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
                  ...this.PARAMS
                })
              }
            >
              <Text>Planes de Visita</Text>
            </Button>
            <Button
              style={buttonStyle}
              block
              success
              onPress={() =>
                this.props.navigation.navigate("ListarVisitas", {
                  ...this.PARAMS
                })
              }
            >
              <Text>Visitas Realizadas</Text>
            </Button>

            <Button
              style={buttonStyle}
              block
              success
              onPress={() =>
                this.props.navigation.navigate("InfoClientes", {
                  ...this.PARAMS
                })
              }
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
                this.props.navigation.navigate("UserInfo", { ...this.PARAMS })
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
