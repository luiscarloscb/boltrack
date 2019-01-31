import React, { Component } from "react";
import { Form } from "native-base";
import { encontrarSucursal, encontrarContacto } from "../utils/helpers";
export class FormPlanearVisita extends Component {
  state = {
    FECHATAREA: new Date(),
    FECHAPLANIFICADA: new Date(),
    IDTIPOTAREA: -1,
    IDCLIENTE: -1,
    IDSUCURSAL: -1,
    IDTEMAVISITA: -1,
    IDCAMPANA: -1,
    DESARROLLOTAREA: "",
    OBJETIVO: "",
    sucursales: [],
    CONTACTO: ""
  };
  componentDidMount() {
    if (this.props.initialState) {
      this.setState({ ...this.props.initialState });
    }
  }
  componentWillUnmount() {
    this.resetState();
  }
  setFechaTarea = FECHATAREA => this.setState({ FECHATAREA });
  setFechaPlanificada = FECHAPLANIFICADA => this.setState({ FECHAPLANIFICADA });
  setTipoTarea = IDTIPOTAREA => this.setState({ IDTIPOTAREA });
  setCampana = IDCAMPANA => this.setState({ IDCAMPANA });
  setCliente = IDCLIENTE =>
    this.setState(() => ({
      IDCLIENTE,
      sucursales: encontrarSucursal(IDCLIENTE, this.props.CLIENTES)
    }));

  setSucursal = IDSUCURSAL => {
    this.setState(state => ({
      IDSUCURSAL,
      CONTACTO: encontrarContacto(state.sucursales, IDSUCURSAL)
    }));
  };
  setTemaVisita = IDTEMAVISITA => this.setState({ IDTEMAVISITA });
  setCantidad = cantidad => this.setState({ cantidad });
  setContacto = CONTACTO => this.setState({ CONTACTO });
  setDesarrolloTarea = DESARROLLOTAREA => this.setState({ DESARROLLOTAREA });
  setObjetivo = OBJETIVO => this.setState({ OBJETIVO });

  resetState = () =>
    //Vuelve el state a su estado original
    this.setState({
      FECHATAREA: new Date(),
      FECHAPLANIFICADA: new Date(),
      IDTIPOTAREA: -1,
      IDCLIENTE: -1,
      IDSUCURSAL: -1,
      IDTEMAVISITA: -1,
      insumo: -1,
      cantidad: "",
      DESARROLLOTAREA: "",
      OBJETIVO: "",
      sucursales: [],
      CONTACTO: "",
      IDCAMPANA: -1
    });

  getSetters = () => ({
    setFechaPlanificada: this.setFechaPlanificada,
    setFechaTarea: this.setFechaTarea,
    setTipoTarea: this.setTipoTarea,
    setCliente: this.setCliente,
    setSucursal: this.setSucursal,
    setTemaVisita: this.setTemaVisita,
    setCantidad: this.setCantidad,
    setDesarrolloTarea: this.setDesarrolloTarea,
    setObjetivo: this.setObjetivo,
    setContacto: this.setContacto,
    setCampana: this.setCampana
  });
  render() {
    return (
      <Form>
        {this.props.children(this.state, this.getSetters(), this.resetState)}
      </Form>
    );
  }
}
