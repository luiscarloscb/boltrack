import React, { Component } from "react";
import { Form } from "native-base";
import { Camara } from "./Camera";
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
    PROVEEDORSECUNDARIOOPT: "",
    SUCURSALFACHADA: "",
    mostrarCamara: false,
    camaraCargando: false
  };
  snap = async (camera, cb) => {
    this.setState({ camaraCargando: true }, async () => {
      if (camera) {
        let imagen = await camera.takePictureAsync({
          base64: true,
          quality: 0.5
        });
        this.setSucursalFachada(imagen.base64);
      }
    });
  };
  setSucursalFachada = SUCURSALFACHADA =>
    this.setState({
      SUCURSALFACHADA,
      mostrarCamara: false,
      camaraCargando: false
    });
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

  setMostrarCamara = () => this.setState({ mostrarCamara: true });
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
      PROVEEDORSECUNDARIOOPT: "",
      SUCURSALFACHADA: "",
      mostrarCamara: false,
      camaraCargando: false
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
    setProveedorSecundarioOpt: this.setProveedorSecundarioOpt,
    snap: this.snap,
    setMostrarCamara: this.setMostrarCamara
  });
  render() {
    return (
      <Form>
        <Camara
          snap={this.snap}
          mostrarCamara={this.state.mostrarCamara}
          isLoading={this.state.camaraCargando}
        />
        {this.props.children(this.state, this.getSetters(), this.resetState)}
      </Form>
    );
  }
}
