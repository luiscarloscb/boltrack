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
    CODIGO: "",
    CORREO: "",
    EMPLEADO: ""
  };
  setEmpleado = EMPLEADO => this.setState({ EMPLEADO });
  setCorreo = CORREO => this.setState({ CORREO });
  setRazonSocial = RAZONSOCIAL =>
    this.setState({ RAZONSOCIAL: RAZONSOCIAL.toUpperCase() });
  setRubro = RUBROID => this.setState({ RUBROID: RUBROID.toUpperCase() });
  setActividadPrincipal = ACTIVIDADPRINCIPAL =>
    this.setState({ ACTIVIDADPRINCIPAL: ACTIVIDADPRINCIPAL.toUpperCase() });
  setActividadSecundaria = ACTIVIDADSECUNDARIA =>
    this.setState({ ACTIVIDADPRINCIPAL: ACTIVIDADSECUNDARIA.toUpperCase() });
  setActividadSecundariaOpt = ACTICVIDADSECUNDARIAOPT =>
    this.setState({
      ACTIVIDADPRINCIPAL: ACTICVIDADSECUNDARIAOPT.toUpperCase()
    });
  setTipoPersona = TIPOPERSONA => this.setState({ TIPOPERSONA });
  setNIT = NIT => this.setState({ NIT });
  setRepresentanteLegal = REPRESENTANTELEGAL =>
    this.setState({ REPRESENTANTELEGAL: REPRESENTANTELEGAL.toUpperCase() });
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
      CODIGO: "",
      CORREO: ""
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
    setCodigo: this.setCodigo,
    setCorreo: this.setCorreo,
    setEmpleado: this.setEmpleado
  });
  render() {
    return (
      <Form>
        {this.props.children(this.state, this.getSetters(), this.resetState)}
      </Form>
    );
  }
}
