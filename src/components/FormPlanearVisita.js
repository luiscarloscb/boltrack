import React, { Component } from "react";
import { Form } from "native-base";

export class FormPlanearVisita extends Component {
  state = {
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
    INSUMOS: [],
    sucursales: [],
    contacto: ""
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
  setCliente = IDCLIENTE =>
    this.setState(() => ({
      IDCLIENTE,
      sucursales: this.encontrarSucursal(IDCLIENTE)
    }));

  setSucursal = IDSUCURSAL => {
    this.setState(state => ({
      IDSUCURSAL,
      contacto: this.encontrarContacto(state.sucursales, IDSUCURSAL)
    }));
  };
  setTemaVisita = IDTEMAVISITA => this.setState({ IDTEMAVISITA });
  setCantidad = cantidad => this.setState({ cantidad });
  setInsumo = insumo => this.setState({ insumo });
  setInsumos = () => {
    //Agrega el insumo y la cantidad seleccionada en la lista INSUMOS
    const { insumo, cantidad } = this.state;
    if (insumo !== "" && parseInt(cantidad) > 0) {
      let nuevoInsumo = {
        insumoID: insumo,
        cantidad: parseInt(cantidad)
      };
      this.setState(state => {
        return {
          INSUMOS: state.INSUMOS.concat(nuevoInsumo),
          insumo: "",
          cantidad: ""
        };
      });
    } else {
      alert("Porfavor llene los campos correctamente");
    }
  };

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
      INSUMOS: [],
      sucursales: []
    });

  encontrarSucursal = IDCLIENTE => {
    // Encuentra las sucursales disponibles por cliente seleccionado
    const { clientes } = this.props;
    const cliente = clientes.find(cliente => cliente.clienteID == IDCLIENTE);
    return cliente ? cliente.sucursales : [];
  };

  encontrarContacto = (SUCURSALES, IDSUCURSAL) => {
    // Encuentra el contacto para la sucursal seleccionada
    const sucursal = SUCURSALES.find(sucur => sucur.sucursalId == IDSUCURSAL);
    return sucursal ? sucursal.sucursalContacto : "SUCURSAL NO SELECCIONADA";
  };
  getSetters = () => ({
    setFechaPlanificada: this.setFechaPlanificada,
    setFechaTarea: this.setFechaTarea,
    setTipoTarea: this.setTipoTarea,
    setCliente: this.setCliente,
    setSucursal: this.setSucursal,
    setTemaVisita: this.setTemaVisita,
    setInsumo: this.setInsumo,
    setCantidad: this.setCantidad,
    setDesarrolloTarea: this.setDesarrolloTarea,
    setObjetivo: this.setObjetivo,
    setInsumos: this.setInsumos
  });
  render() {
    return (
      <Form>
        {this.props.children(this.state, this.getSetters(), this.resetState)}
      </Form>
    );
  }
}
