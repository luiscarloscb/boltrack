import React, { Component } from "react";
import { Form } from "native-base";
import { guardarOrden } from "../utils/localStorageAPI";
import { encontrarSucursal } from "../utils/helpers";

export class FormOrdenPedido extends Component {
  state = {
    IDCLIENTE: -1,
    IDSUCURSAL: -1,
    FECHAORDEN: new Date(),
    IDFORMAPAGO: -1,
    ARTICULOS: [],
    ARTICULO: "",
    CANTIDAD: "",
    CUOTAS: "",
    PRECIOBASE: "",
    CORREOOPT: "",
    IDCAMPANA: -1,
    FECHAENTREGA: new Date(),
    sucursales: []
  };
  //BACK TO INIT STATE
  resetOrdenState = () =>
    this.setState({
      IDCLIENTE: -1,
      IDSUCURSAL: -1,
      FECHAORDEN: new Date(),
      IDFORMAPAGO: -1,
      ARTICULOS: [],
      ARTICULO: "",
      CANTIDAD: "",
      CUOTAS: "",
      PRECIOBASE: "",
      CORREOOPT: "",
      IDCAMPANA: -1,
      FECHAENTREGA: new Date(),
      sucursales: []
    });

  // SETTINGS FOR INDIVIDUAL PIECES OF STATE.
  setCuotas = CUOTAS => this.setState({ CUOTAS });
  setCampana = IDCAMPANA => this.setState({ IDCAMPANA });
  setCorreoOpt = CORREOOPT => this.setState({ CORREOOPT });
  setFechaEntrega = FECHAENTREGA => this.setState({ FECHAENTREGA });
  setFechaOrden = FECHAORDEN => this.setState({ FECHAORDEN });
  setFormaPago = IDFORMAPAGO => this.setState({ IDFORMAPAGO });
  setArticulo = ARTICULO =>
    this.setState({
      ARTICULO,
      PRECIOBASE: this.props.INSUMOS.find(
        insumo => insumo.insumoID === ARTICULO
      ).precioBase
    });
  setCantidad = CANTIDAD => this.setState({ CANTIDAD });
  setPrecioBase = PRECIOBASE => this.setState({ PRECIOBASE });
  setCliente = IDCLIENTE =>
    this.setState(() => ({
      IDCLIENTE,
      sucursales: encontrarSucursal(IDCLIENTE, this.props.CLIENTES)
    }));
  setSucursal = IDSUCURSAL =>
    this.setState({
      IDSUCURSAL
    });
  setArticulos = () => {
    const { ARTICULO, CANTIDAD, PRECIOBASE } = this.state;
    if (
      ARTICULO !== "" &&
      parseInt(CANTIDAD) > 0 &&
      parseFloat(PRECIOBASE) > 0
    ) {
      let nuevoArticulo = {
        articuloNombre: this.props.INSUMOS.find(
          insumo => insumo.insumoID === ARTICULO
        ).insumoNombre,
        articuloID: ARTICULO,
        cantidad: parseInt(CANTIDAD),
        precioBase: parseFloat(PRECIOBASE)
      };
      this.setState(state => {
        return {
          ARTICULOS: state.ARTICULOS.concat(nuevoArticulo),
          ARTICULO: "",
          CANTIDAD: "",
          PRECIOBASE: ""
        };
      });
    } else {
      alert(
        "PARA AGREGAR UN ARTICULO PORFAVOR LLENE LOS CAMPOS: ARTICULO, CANTIDAD, PRECIO"
      );
    }
  };
  eliminarArticulo = idArticulo =>
    this.setState(state => ({
      ARTICULOS: state.ARTICULOS.filter(
        articulo => articulo.articuloID !== idArticulo
      )
    }));

  onSave = () => {
    const { ARTICULO, CANTIDAD, PRECIOBASE, sucursales, ...rest } = this.state;
    //REQUIRED FIELDS TO SAVE AN ORDER
    if (rest.IDSUCURSAL && rest.FECHAORDEN && rest.IDCAMPANA) {
      rest.CUOTAS = Number(rest.CUOTAS);
      guardarOrden({ ...rest }, () => {
        this.resetOrdenState();
        alert("Orden Guardada Localmente");
      });
    } else {
      alert("Porfavor llene los campos correctamente");
    }
  };
  getSetters = () => ({
    setCliente: this.setCliente,
    setSucursal: this.setSucursal,
    setFechaOrden: this.setFechaOrden,
    setFormaPago: this.setFormaPago,
    setFechaEntrega: this.setFechaEntrega,
    setArticulo: this.setArticulo,
    setCantidad: this.setCantidad,
    setPrecioBase: this.setPrecioBase,
    setArticulos: this.setArticulos,
    setCorreoOpt: this.setCorreoOpt,
    setCampana: this.setCampana,
    setCuotas: this.setCuotas,
    eliminarArticulo: this.eliminarArticulo,
    onSave: this.onSave
  });
  render() {
    return <Form>{this.props.children(this.state, this.getSetters())}</Form>;
  }
}
