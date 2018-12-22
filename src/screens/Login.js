import React, { Component } from "react";
import { View } from "react-native";
import { Form, Item, Input, Text } from "native-base";
import { Button } from "../components/Button";
import { containersStyles, inputStyles, fontStyles } from "../styles";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleUsernameChange = username => {
    this.setState({ username: username.replace(/[^a-zA-Z0-9-_]+$/g, "") });
  };
  handlePasswordChange = password => this.setState({ password });

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
          <Button
            rounded
            block
            key="public"
            onPress={() => {
              console.log("pressed");
            }}
          >
            Iniciar sesion
          </Button>
        </Form>
      </View>
    );
  }
}

export default Login;
