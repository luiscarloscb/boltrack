import React, { Component } from "react";
import { Content, Icon, Text, Spinner } from "native-base";
import { Button } from "../components/Button";
import { Lista } from "../components/Lista";
import { registrarVisita } from "../utils/boltrackAPI";

export class ListarVisitas extends Component {
  state = { estaEnviando: false };

  setEstaEnviando = () => {
    this.setState(state => ({ estaEnviando: !state.estaEnviando }));
  };
  render() {
    const { DATA, TOKEN } = this.props.navigation.state.params;
    return (
      <Lista
        estado="COMPLETADA"
        data={DATA}
        renderOptions={visita =>
          visita.CARGADO ? (
            <Text> En Servidor </Text>
          ) : this.state.estaEnviando ? (
            <Spinner />
          ) : (
            <Button
              info
              style={{ alignContent: "center" }}
              onPress={() => {
                this.setEstaEnviando();
                registrarVisita(
                  { ...visita, token: TOKEN },
                  this.setEstaEnviando
                ).then(res => alert(res.mensaje));
              }}
            >
              <Icon name="ios-cloud-upload" style={{ color: "white" }} />
            </Button>
          )
        }
      />
    );
  }
}
