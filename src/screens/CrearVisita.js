import React, { Component, Fragment } from "react";
import {
  Thumbnail,
  Text,
  Item,
  Input,
  DatePicker,
  Label,
  Card,
  Container,
  Content
} from "native-base";
import { Button } from "../components/Button";
import { FormRealizarVisita } from "../components/FormRealizarVisita";
import { VisitaDetalles } from "../components/VisitaDetalles";
import { guardarVisitaRealizada } from "../utils/localStorageAPI";
import { GPSInput } from "../components";
export class CrearVisita extends Component {
  state = {
    mostrarPlanDetallado: false,
    query: "",
    habilitarGPS: true
  };
  onToggleGPS = () =>
    this.setState(state => ({ habilitarGPS: !state.habilitarGPS }));
  toggleCatalogo = () =>
    this.setState(state => ({ campañaCatalogo: !state.campañaCatalogo }));
  componentDidMount() {}
  setMostrarPlanDetallado = () =>
    this.setState(state => ({
      mostrarPlanDetallado: !state.mostrarPlanDetallado
    }));
  guardarVisita = async state => {
    const {
      errorMessage,
      status,
      mostrarCamara,
      camaraCargando,
      ...rest
    } = state;
    const { visita, DATA } = this.props.navigation.state.params;
    if (
      this.state.habilitarGPS &&
      state.COORDENADASGPS[0] &&
      state.COORDENADASGPS[1]
    ) {
      await guardarVisitaRealizada({ ...visita, ...rest }, () =>
        this.props.navigation.goBack()
      );
    } else {
      if (!this.state.habilitarGPS) {
        await guardarVisitaRealizada({ ...visita, ...rest }, () =>
          this.props.navigation.goBack()
        );
      } else {
        alert("No se pudo obtener cordenadas GPS");
      }
    }
  };
  setQuery = query => this.setState({ query });
  resetQuery = () => this.setState({ query: "" });

  render() {
    const { mostrarPlanDetallado, habilitarGPS } = this.state;
    return (
      <Container style={{ backgroundColor: "#EEEEEE" }}>
        <Content style={{ paddingHorizontal: 10 }}>
          <Card>
            <Fragment>
              <Button
                onPress={this.setMostrarPlanDetallado}
                full
                style={{ backgroundColor: "#EEEEEE" }}
              >
                {mostrarPlanDetallado ? "Ocultar Plan" : "Mostrar Plan"}
              </Button>
              {mostrarPlanDetallado && (
                <VisitaDetalles
                  visita={this.props.navigation.state.params.visita}
                  {...this.props.navigation.state.params.DATA}
                />
              )}
              <FormRealizarVisita>
                {(state, setters, resetState) => (
                  <Fragment>
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
                        androidMode={"Fecha para la visita"}
                        textStyle={{ color: "green" }}
                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                        onDateChange={setters.setFechaProximaVisita}
                      />
                    </Item>

                    <GPSInput
                      value={state.COORDENADASGPS}
                      setCoordenadas={setters.setCoordenadas}
                      isGpsEnable={this.state.habilitarGPS}
                      onEnableGPS={this.onToggleGPS}
                    />
                    <Button success full onPress={setters.setMostrarCamara}>
                      Tomar foto
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
                      success
                      block
                      onPress={() => this.guardarVisita(state)}
                    >
                      Guardar Visita
                    </Button>
                  </Fragment>
                )}
              </FormRealizarVisita>
            </Fragment>
          </Card>
        </Content>
      </Container>
    );
  }
}
