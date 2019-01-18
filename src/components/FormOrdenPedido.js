// ***Orden de Pedido
// * Cliente
// * Sucursal
// * Fecha generacion de Orden (fecha actual por defecto pero que deje escoger)
// * Forma de pago (Efectivo/Credito/Cuotas (Nro. de Cuotas))
// * Articulos o Servicios ( [nombre, cantidad, precioBase/precio1/precio2] )
// * Fecha comprometida de entrega
import React, { Component } from "react";
import { Form } from "native-base";

export class FormOrdenPedido extends Component {
  state = {
    IDCLIENTE: -1,
    IDSUCURSAL: -1,
    FECHAORDEN: new Date(),
    FORMAPAGO: "",
    ARTICULOS: [],
    ARTICULO: "",
    CANTIDAD: "",
    PRECIOBASE: "",
    PRECIOSECUNDARIO: "",
    PRECIOSECUNDARIOOPT: "",
    FECHAENTREGA: new Date(),
    sucursales: []
  };

  setCliente = IDCLIENTE =>
    this.setState(() => ({
      IDCLIENTE,
      sucursales: this.encontrarSucursal(IDCLIENTE)
    }));

  setSucursal = IDSUCURSAL =>
    this.setState({
      IDSUCURSAL
    });
  setFechaOrden = FECHAORDEN => this.setState({ FECHAORDEN });
  setFormaPago = FORMAPAGO => this.setState({ FORMAPAGO });
  setArticulo = ARTICULO => this.setState({ ARTICULO });
  setCantidad = CANTIDAD => this.setState({ CANTIDAD });
  setPrecioBase = PRECIOBASE => this.setState({ PRECIOBASE });
  setPrecioSecundario = PRECIOSECUNDARIO => this.setState({ PRECIOSECUNDARIO });
  setPrecioSecundarioOpt = PRECIOSECUNDARIOOPT =>
    this.setState({ PRECIOSECUNDARIOOPT });
  setArticulos = () => {
    //Agrega el insumo y la cantidad seleccionada en la lista INSUMOS
    const {
      ARTICULO,
      CANTIDAD,
      PRECIOBASE,
      PRECIOSECUNDARIO,
      PRECIOSECUNDARIOOPT
    } = this.state;
    if (
      ARTICULO !== "" &&
      parseInt(CANTIDAD) > 0 &&
      parseInt(PRECIOBASE) > 0 &&
      parseInt(PRECIOSECUNDARIO) > 0 &&
      parseInt(PRECIOSECUNDARIOOPT) > 0
    ) {
      let nuevoArticulo = {
        articuloID: ARTICULO,
        cantidad: parseInt(CANTIDAD),
        precioBase: parseInt(PRECIOBASE),
        precioSecundario: parseInt(PRECIOSECUNDARIO),
        precioSecundarioOpt: parseInt(PRECIOSECUNDARIOOPT)
      };
      this.setState(state => {
        return {
          ARTICULOS: state.ARTICULOS.concat(nuevoArticulo),
          ARTICULO: "",
          CANTIDAD: "",
          PRECIOBASE: "",
          PRECIOSECUNDARIO: "",
          PRECIOSECUNDARIOOPT: ""
        };
      });
    } else {
      alert("Porfavor llene los campos correctamente");
    }
  };
  setFechaEntrega = FECHAENTREGA => this.setState({ FECHAENTREGA });
  encontrarSucursal = IDCLIENTE => {
    // Encuentra las sucursales disponibles por cliente seleccionado
    const { clientes } = this.props;
    const cliente = clientes.find(cliente => cliente.clienteID == IDCLIENTE);
    return cliente ? cliente.sucursales : [];
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
    setPrecioSecundario: this.setPrecioSecundario,
    setPrecioSecundarioOpt: this.setPrecioSecundarioOpt,
    setArticulos: this.setArticulos
  });
  render() {
    return <Form>{this.props.children(this.state, this.getSetters())}</Form>;
  }
}
