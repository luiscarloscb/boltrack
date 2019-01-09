import React, { Component } from "react";
import { Location, Permissions } from "expo";
import { Container, Content } from "native-base";
import { Button } from "./Button";
import { Camara } from "./Camera";

export class FormRealizarVisita extends Component {
  state = {
    FECHAVISITA: "",
    LOGROSVISITA: "",
    FECHAPROXIMAVISITA: "",
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

  componentDidMount() {
    Permissions.getAsync(Permissions.LOCATION)
      .then(({ status }) => {
        if (status === "granted") {
          return this.obtenerCoordenadas();
        }

        this.setState(() => ({ status }));
      })
      .catch(error => {
        console.warn("Error getting Location permission: ", error);

        this.setState(() => ({ status: "undetermined" }));
      });
  }
  obtenerCoordenadas = async () => {
    Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        timeInterval: 1,
        distanceInterval: 1
      },
      ({ coords }) => {
        const { latitude, longitude } = coords;
        this.setState(() => ({
          COORDENADASGPS: [latitude, longitude],
          status: "granted"
        }));
      }
    );
  };
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
    setInsumos: this.setInsumos
  });
  render() {
    return this.state.mostrarCamara ? (
      <Camara snap={this.snap} isLoading={this.state.camaraCargando} />
    ) : (
      <Container style={{ backgroundColor: "#EEEEEE" }}>
        <Content style={{ paddingHorizontal: 10 }}>
          {this.props.children(this.state, this.getSetters(), this.resetState)}
        </Content>
      </Container>
    );
  }
}
