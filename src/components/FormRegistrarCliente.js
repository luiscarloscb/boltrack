import React, { Component } from "react";
import { Form } from "native-base";

export class FormRegistrarCliente extends Component {
  state = {
    RAZONSOCIAL: "",
    RUBROID: "",
    ACTIVIDADPRINCIPAL: "",
    ACTIVIDADSECUNDARIA: "",
    ACTICVIDADSECUNDARIAOPT: "",
    TIPOPERSONA: "",
    NIT: "",
    REPRESENTANTELEGAL: "",
    isChecked: false,
    LIMITECREDITO: "",
    CODIGO: ""
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
  toggleIsChecked = () =>
    this.setState(state => ({ isChecked: !state.isChecked }));
  setLimiteCredito = LIMITECREDITO => this.setState({ LIMITECREDITO });
  setCodigo = CODIGO => this.setState({ CODIGO });
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
      REPRESENTANTELEGAL: "",
      isChecked: false,
      LIMITECREDITO: "",
      CODIGO: ""
    });
  getSetters = () => ({
    setRazonSocial: this.setRazonSocial,
    setRubro: this.setRubro,
    setActividadPrincipal: this.setActividadPrincipal,
    setActividadSecundaria: this.setActividadSecundaria,
    setActividadSecundariaOpt: this.setActividadSecundariaOpt,
    setTipoPersona: this.setTipoPersona,
    setNIT: this.setNIT,
    setRepresentanteLegal: this.setRepresentanteLegal,
    toggleIsChecked: this.toggleIsChecked,
    setLimiteCredito: this.setLimiteCredito,
    setCodigo: this.setCodigo
  });
  render() {
    return (
      <Form>
        {this.props.children(this.state, this.getSetters(), this.resetState)}
      </Form>
    );
  }
}
