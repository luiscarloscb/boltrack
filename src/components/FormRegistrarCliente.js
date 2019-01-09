import React, { Component } from "react";
import { Location, Permissions } from "expo";
import { Container, Content } from "native-base";
import { Button } from "./Button";
import { Camara } from "./Camera";

export class FormRegistrarCliente extends Component {
  state = {
    RAZONSOCIAL: "",
    RUBROID: "",
    ACTIVIDADPRINCIPAL: "",
    ACTIVIDADSECUNDARIA: "",
    ACTICVIDADSECUNDARIAOPT: "",
    TIPOPERSONA: "",
    NIT: "",
    REPRESENTANTELEGAL: ""
  };

  setRazonSocial = RAZONSOCIAL => this.setState({ RAZONSOCIAL });
  setRubro = RUBROID => this.setState({ RUBROID });
  setActividadPrincipal = ACTIVIDADPRINCIPAL =>
    this.setState({ ACTIVIDADPRINCIPAL });
  setActividadSecundaria = ACTIVIDADSECUNDARIA =>
    this.setState({ ACTIVIDADSECUNDARIA });
  setActividadSecundariaOpt = ACTICVIDADSECUNDARIAOPT =>
    this.setState({ ACTICVIDADSECUNDARIAOPT });
  setTipoPersona = TIPOPERSONA => this.setState({ TIPOPERSONA });
  setNIT = NIT => this.setState({ NIT });
  setRepresentanteLegal = REPRESENTANTELEGAL =>
    this.setState({ REPRESENTANTELEGAL });

  componentWillUnmount() {
    this.resetState();
  }

  resetState = () =>
    this.setState({
      RAZONSOCIAL: "",
      RUBROID: "",
      ACTIVIDADPRINCIPAL: "",
      ACTIVIDADSECUNDARIA: "",
      ACTICVIDADSECUNDARIAOPT: "",
      TIPOPERSONA: "",
      NIT: "",
      REPRESENTANTELEGAL: ""
    });
  getSetters = () => ({
    setRazonSocial: this.setRazonSocial,
    setRubro: this.setRubro,
    setActividadPrincipal: this.setActividadPrincipal,
    setActividadSecundaria: this.setActividadSecundaria,
    setActividadSecundariaOpt: this.setActividadSecundariaOpt,
    setTipoPersona: this.setTipoPersona,
    setNIT: this.setNIT,
    setRepresentanteLegal: this.setRepresentanteLegal
  });
  render() {
    return (
      <Container style={{ backgroundColor: "#EEEEEE" }}>
        <Content style={{ paddingHorizontal: 10 }}>
          {this.props.children(this.state, this.getSetters(), this.resetState)}
        </Content>
      </Container>
    );
  }
}
