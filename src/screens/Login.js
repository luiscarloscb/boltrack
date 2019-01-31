import React, { Component } from "react";
import { LocalAuthentication } from "expo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Form, Item, Input, Text, Container, Content } from "native-base";
import { Button } from "../components/Button";
import { containersStyles, inputStyles, fontStyles } from "../styles";
import { login } from "../utils/boltrackAPI";
import { guardarDato, obtenerDato } from "../utils/localStorageAPI";
import { StackActions, NavigationActions } from "react-navigation";
import { PinAuth } from "../components/PinAuth";
import { Platform, View } from "react-native";
export class Login extends Component {
  state = {
    username: "",
    password: "",
    showPin: false,
    pinText: ""
  };

  async componentDidMount() {
    const TOKEN = await obtenerDato("TOKEN");
    if (TOKEN) {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (hasHardware && isEnrolled) {
        const {
          success,
          error
        } = await LocalAuthentication.authenticateAsync();
        if (success) {
          this.props.navigation.navigate("Opciones");
        } else {
          console.log(error);
        }
      } else {
        this.obtenerPinText();
      }
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
      const PIN = await obtenerDato("PIN");
      if (PIN) {
        this.props.navigation.dispatch(resetAction);
      } else {
        this.setState({ showPin: true, pinText: "Ingrese Nuevo Pin" });
      }
    } else {
      alert(response.mensaje);
      this.setState({ username: "", password: "" });
    }
  };
  setPin = async (val, clear) => {
    const PIN = await obtenerDato("PIN");
    if (PIN) {
      //REQUEST PIN
      if (PIN === val) {
        this.props.navigation.navigate("Opciones");
        this.setState({ showPin: false });
        clear();
      } else {
        clear();
        alert("Pin incorrecto");
      }
    } else {
      //CREATE PIN
      await guardarDato("PIN", val);
      this.setState({ showPin: false });
      clear();
      alert("pin guardado correctamente");
    }
  };
  obtenerPinText = async () => {
    const PIN = await obtenerDato("PIN");
    if (PIN) {
      this.setState({
        showPin: true,
        pinText: "Ingrese Pin"
      });
    } else {
      this.setState({
        showPin: true,
        pinText: "Ingrese Nuevo Pin"
      });
    }
  };
  render() {
    const { authBackground } = containersStyles;
    const { username, password, showPin } = this.state;
    return showPin ? (
      <PinAuth onComplete={this.setPin} info={this.state.pinText} />
    ) : (
      <Container style={authBackground}>
        <KeyboardAwareScrollView
          enableOnAndroid
          enableAutomaticScroll
          keyboardOpeningTime={0}
          extraHeight={Platform.select({ android: 200 })}
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
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
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

// <Content
//           contentContainerStyle={{
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center"
//           }}
//         ></Content>
//         </Content>
