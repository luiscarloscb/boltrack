import React, { Component } from "react";
import { View } from "react-native";
import { Form, Item, Input, Text } from "native-base";
import { Button } from "../components/Button";
import { containersStyles, inputStyles, fontStyles } from "../styles";
import { login } from "../utils/boltrackAPI";
import { guardarDatos, obtenerDatos } from "../utils/localStorageAPI";
export class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  componentDidMount(){
    const TOKEN = await obtenerDatos('TOKEN')
    if(TOKEN){
      this.props.navigation.navigate('Opciones')
    }
  }
  componentWillUnmount(){
    this.setState({ username: "", password: "" });
  }
  handleUsernameChange = username => {
    this.setState({ username: username.replace(/[^a-zA-Z0-9-_]+$/g, "") });
  };

  handlePasswordChange = password => this.setState({ password });

  handleLogin = async () => {
    const { username, password } = this.state;
    const response = await login(username, password);
    if (response.TOKEN) {
      await guardarDatos("TOKEN", response.TOKEN);
      await guardarDatos("DATA", response.DATA);
      await guardarDatos("CONFIG", response.CONFIG);
      this.props.navigation.navigate("Opciones");
    } else {
      console.log(response.mensaje);
      this.setState({ username: "", password: "" });
    }
  };

  render() {
    const { authBackground } = containersStyles;
    const { username, password } = this.state;
    return (
      <View style={authBackground}>
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
      </View>
    );
  }
}
