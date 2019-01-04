import React, { Component } from "react";
import { Form, Item, Input, Text, Container, Content } from "native-base";
import { Button } from "../components/Button";
import { containersStyles, inputStyles, fontStyles } from "../styles";
import { login } from "../utils/boltrackAPI";
import { guardarDato, obtenerDato } from "../utils/localStorageAPI";
import { StackActions, NavigationActions } from "react-navigation";

export class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  async componentDidMount() {
    const TOKEN = await obtenerDato("TOKEN");
    if (TOKEN) {
      this.props.navigation.navigate("Opciones");
    }
  }
  componentWillUnmount() {
    this.setState({ username: "", password: "" });
  }
  handleUsernameChange = username => {
    this.setState({ username: username.replace(/[^a-zA-Z0-9-_]+$/g, "") });
  };

  handlePasswordChange = password => this.setState({ password });

  handleLogin = async () => {
    const { username, password } = this.state;

    //Limpiando el stack de rutas
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Opciones" })]
    });

    //Iniciando login
    const response = await login(username, password);
    if (response.TOKEN) {
      await guardarDato("TOKEN", response.TOKEN);
      await guardarDato("DATA", response.DATA);
      await guardarDato("CONFIG", response.CONFIG);
      this.props.navigation.dispatch(resetAction);
    } else {
      console.log(response.mensaje);
      this.setState({ username: "", password: "" });
    }
  };

  render() {
    const { authBackground } = containersStyles;
    const { username, password } = this.state;
    return (
      <Container style={authBackground}>
        <Content>
          <Text style={fontStyles.brandTitle}>Boltrack</Text>
          <Text style={fontStyles.brandSubtitle}>Logistica Satelital</Text>
          <Form>
            <Item rounded style={inputStyles.authInput}>
              <Input
                placeholder="username"
                onChangeText={this.handleUsernameChange}
                value={username}
                maxLength={64}
                textContentType={"username"}
              />
            </Item>
            <Item rounded style={inputStyles.authInput}>
              <Input
                placeholder="Contraseña"
                secureTextEntry
                onChangeText={this.handlePasswordChange}
                value={password}
              />
            </Item>
            <Button rounded block key="public" onPress={this.handleLogin}>
              Iniciar sesion
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
