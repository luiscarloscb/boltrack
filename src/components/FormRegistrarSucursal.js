import React, { Component } from "react";
import { Container, Content } from "native-base";

export class FormRegistrarSucursal extends Component {
  state = {
    NOMBRESUCURSAL: "",
    DIRECCION: "",
    COORDENADAS: [],
    TIPOSUCURSAL: "",
    AREA: "",
    AREAMEDIDA: "",
    CONTACTO: "",
    TELFCONTACTO: "",
    CATEGORIA: "",
    VOLUMENVENTAS: "",
    PROVEEDORPRINCIPAL: "",
    PROVEEDORSECUNDARIO: "",
    PROVEEDORSECUNDARIOOPT: ""
  };

  setNombreSucursal = NOMBRESUCURSAL => this.setState({ NOMBRESUCURSAL });
  setDireccion = DIRECCION => this.setState({ DIRECCION });
  setCoordenadas = COORDENADAS => this.setState({ COORDENADAS });
  setTipoSucursal = TIPOSUCURSAL => this.setState({ TIPOSUCURSAL });
  setArea = AREA => this.setState({ AREA });
  setAreaMedida = AREAMEDIDA => this.setState({ AREAMEDIDA });
  setContacto = CONTACTO => this.setState({ CONTACTO });
  setTelfContacto = TELFCONTACTO => this.setState({ TELFCONTACTO });
  setCategoria = CATEGORIA => this.setState({ CATEGORIA });
  setVolumenVentas = VOLUMENVENTAS => this.setState({ VOLUMENVENTAS });
  setProveedorPrincipal = PROVEEDORPRINCIPAL =>
    this.setState({ PROVEEDORPRINCIPAL });
  setProveedorSecundario = PROVEEDORSECUNDARIO =>
    this.setState({ PROVEEDORSECUNDARIO });
  setProveedorSecundarioOpt = PROVEEDORSECUNDARIOOPT =>
    this.setState({ PROVEEDORSECUNDARIOOPT });
  componentWillUnmount() {
    this.resetState();
  }

  resetState = () =>
    this.setState({
      NOMBRESUCURSAL: "",
      DIRECCION: "",
      COORDENADAS: [],
      TIPOSUCURSAL: "",
      AREA: "",
      CONTACTO: "",
      TELFCONTACTO: "",
      CATEGORIA: "",
      VOLUMENVENTAS: "",
      PROVEEDORPRINCIPAL: "",
      PROVEEDORSECUNDARIO: "",
      PROVEEDORSECUNDARIOOPT: ""
    });
  getSetters = () => ({
    setNombreSucursal: this.setNombreSucursal,
    setDireccion: this.setDireccion,
    setCoordenadas: this.setCoordenadas,
    setTipoSucursal: this.setTipoSucursal,
    setArea: this.setArea,
    setAreaMedida: this.setAreaMedida,
    setContacto: this.setContacto,
    setTelfContacto: this.setTelfContacto,
    setCategoria: this.setCategoria,
    setVolumenVentas: this.setVolumenVentas,
    setProveedorPrincipal: this.setProveedorPrincipal,
    setProveedorSecundario: this.setProveedorSecundario,
    setProveedorSecundarioOpt: this.setProveedorSecundarioOpt
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
