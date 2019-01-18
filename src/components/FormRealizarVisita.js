import React, { Component } from "react";
import { Location, Permissions } from "expo";
import { Form } from "native-base";
import { Camara } from "./Camera";

export class FormRealizarVisita extends Component {
  state = {
    FECHAVISITA: new Date(),
    LOGROSVISITA: "",
    FECHAPROXIMAVISITA: new Date(),
    COORDENADASGPS: [],
    IMAGENES: [],
    cantidad: "",
    insumo: "",
    INSUMOSGASTADOS: [],
    errorMessage: "",
    status: "",
    mostrarCamara: false,
    camaraCargando: false
  };
  componentWillUnmount() {
    this.resetState();
  }
  setCoordenadas = COORDENADASGPS => this.setState({ COORDENADASGPS });
  setCantidad = cantidad => this.setState({ cantidad });
  setInsumo = insumo => this.setState({ insumo });
  setInsumos = () => {
    //Agrega el insumo y la cantidad seleccionada en la lista INSUMOS
    const { insumo, cantidad } = this.state;
    if (insumo !== "" || parseInt(cantidad) > 0) {
      let nuevoInsumo = {
        insumoID: insumo,
        cantidad: parseInt(cantidad)
      };
      this.setState(state => {
        return {
          INSUMOSGASTADOS: state.INSUMOSGASTADOS.concat(nuevoInsumo),
          cantidad: "",
          insumo: ""
        };
      });
    } else {
      alert("Porfavor llene los campos correctamente");
    }
  };
  setFechaVisita = FECHAVISITA => this.setState({ FECHAVISITA });

  setFechaProximaVisita = FECHAPROXIMAVISITA =>
    this.setState({ FECHAPROXIMAVISITA });

  setLogroVisita = LOGROSVISITA => this.setState({ LOGROSVISITA });
  setMostrarCamara = () => this.setState({ mostrarCamara: true });
  setImagen = IMAGEN =>
    this.setState(state => ({
      IMAGENES: state.IMAGENES.concat(IMAGEN),
      mostrarCamara: false,
      camaraCargando: false
    }));

  snap = async (camera, cb) => {
    this.setState({ camaraCargando: true }, async () => {
      if (camera) {
        let imagen = await camera.takePictureAsync({
          base64: true,
          quality: 0.5
        });
        this.setImagen(imagen.base64);
      }
    });
  };
  resetState = () =>
    this.setState({
      FECHAVISITA: new Date(),
      LOGROSVISITA: "",
      FECHAPROXIMAVISITA: new Date(),
      COORDENADASGPS: [],
      IMAGENES: [],
      errorMessage: "",
      status: "",
      mostrarCamara: false,
      camaraCargando: false
    });
  getSetters = () => ({
    setFechaProximaVisita: this.setFechaProximaVisita,
    setFechaVisita: this.setFechaVisita,
    setImagen: this.setImagen,
    setLogroVisita: this.setLogroVisita,
    setMostrarCamara: this.setMostrarCamara,
    setCantidad: this.setCantidad,
    setInsumo: this.setInsumo,
    setInsumos: this.setInsumos,
    setCoordenadas: this.setCoordenadas,
    snap: this.snap
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
