import React, { Component, Fragment } from "react";
import {
  Card,
  Item,
  DatePicker,
  Thumbnail,
  Text,
  Label,
  Input,
  Button
} from "native-base";
import { FormRealizarVisita } from "./FormRealizarVisita";
import { guardarVisitaRealizada } from "../utils/localStorageAPI";
import { uuidv4, encontrarSucursal } from "../utils/helpers";
import { GPSInput } from "./GPSInput";

export class FormVisitaNoProgramada extends Component {
  state = {
    IDCLIENTE: -1,
    IDSUCURSAL: -1,
    IDCAMPANA: -1,
    sucursales: [],
    query: "",
    habilitarGPS: true
  };
  onToggleGPS = () =>
    this.setState(state => ({ habilitarGPS: !state.habilitarGPS }));
  setQuery = query => this.setState({ query });
  resetQuery = () => this.setState({ query: "" });

  setCampana = IDCAMPANA => this.setState({ IDCAMPANA });
  setCliente = IDCLIENTE =>
    this.setState(() => ({
      IDCLIENTE,
      sucursales: encontrarSucursal(IDCLIENTE, this.props.CLIENTES)
    }));

  setSucursal = IDSUCURSAL => {
    this.setState({
      IDSUCURSAL
    });
  };

  guardarVisita = async state => {
    const {
      errorMessage,
      status,
      mostrarCamara,
      camaraCargando,
      insumo,
      cantidad,
      ...rest
    } = state;
    const { IDCLIENTE, IDSUCURSAL, habilitarGPS, IDCAMPANA } = this.state;
    if (habilitarGPS && state.COORDENADASGPS[0] && state.COORDENADASGPS[1]) {
      if (IDCLIENTE !== -1 && IDSUCURSAL !== -1 && IDCAMPANA !== -1) {
        await guardarVisitaRealizada(
          { ...rest, IDCLIENTE, IDSUCURSAL, IDCAMPANA, IDVISITA: uuidv4() },
          () => this.props.goBack()
        );
      } else {
        alert("Porfavor seleccione Cliente y Sucursal");
      }
    } else {
      if (!this.state.habilitarGPS) {
        if (IDCLIENTE !== -1 && IDSUCURSAL !== -1 && IDCAMPANA !== -1) {
          await guardarVisitaRealizada(
            { ...rest, IDCLIENTE, IDSUCURSAL, IDCAMPANA, IDVISITA: uuidv4() },
            () => this.props.navigation.goBack()
          );
        } else {
          alert("Porfavor seleccione Cliente y Sucursal");
        }
      } else {
        alert("No se pudo obtener cordenadas GPS");
      }
    }
  };
  resetState = () => this.setState({ IDCLIENTE: -1, IDSUCURSAL: -1 });
  getSetters = () => ({
    setCliente: this.setCliente,
    setSucursal: this.setSucursal,
    setCampana: this.setCampana
  });
  render() {
    return (
      <Fragment>
        {this.props.children(this.state, this.getSetters(), this.resetState)}
        <FormRealizarVisita>
          {(state, setters, resetState) => (
            <Card>
              <Item>
                <DatePicker
                  defaultDate={new Date()}
                  minimumDate={new Date()}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"Fecha para la visita"}
                  textStyle={{ color: "green" }}
                  placeHolderTextStyle={{ color: "#d3d3d3" }}
                  onDateChange={setters.setFechaVisita}
                />
                <Text>
                  Fecha Visita: {state.FECHAVISITA.toString().substr(4, 12)}
                </Text>
              </Item>
              <Item>
                <Item stackedLabel>
                  <Label>Logro de la Visita</Label>
                  <Input
                    multiline
                    value={state.LOGROSVISITA}
                    onChangeText={setters.setLogroVisita}
                    width={300}
                  />
                </Item>
              </Item>
              <Item>
                <DatePicker
                  defaultDate={new Date()}
                  minimumDate={new Date()}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"Fecha para la proxima visita"}
                  textStyle={{ color: "green" }}
                  placeHolderTextStyle={{ color: "#d3d3d3" }}
                  onDateChange={setters.setFechaProximaVisita}
                />
                <Text>
                  Fecha Proxima Visita:
                  {state.FECHAPROXIMAVISITA.toString().substr(4, 12)}
                </Text>
              </Item>

              <GPSInput
                setCoordenadas={setters.setCoordenadas}
                value={state.COORDENADASGPS}
                isGpsEnable={this.state.habilitarGPS}
                onEnableGPS={this.onToggleGPS}
              />
              <Button
                style={{ margin: 10 }}
                success
                full
                onPress={setters.setMostrarCamara}
              >
                <Text>Tomar foto</Text>
              </Button>
              <Item style={{ justifyContent: "space-around" }}>
                {state.IMAGENES.map(imagen => (
                  <Thumbnail
                    key={imagen}
                    large
                    square
                    source={{
                      uri: imagen
                        ? `data:image/jpg;base64,${imagen}`
                        : "../../assets/imagen-placeholder.jpg"
                    }}
                  />
                ))}
              </Item>
              <Button
                style={{ margin: 10 }}
                success
                block
                onPress={() => this.guardarVisita(state)}
              >
                <Text>Guardar Visita</Text>
              </Button>
            </Card>
          )}
        </FormRealizarVisita>
      </Fragment>
    );
  }
}
