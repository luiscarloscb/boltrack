import React, { Component, Fragment } from "react";

import {
  Thumbnail,
  Text,
  Item,
  Input,
  DatePicker,
  Label,
  Picker,
  Card,
  Container,
  Content
} from "native-base";
import { Button } from "../components/Button";
import { FormRealizarVisita } from "../components/FormRealizarVisita";
import { VisitaDetalles } from "../components/VisitaDetalles";
import { InsumosPicker } from "../components/InsumosPicker";
import { ListaInsumos } from "../components/ListaInsumos";
import { guardarVisitaRealizada } from "../utils/localStorageAPI";
import { GPSInput } from "../components/GPSInput";
import { StackActions, NavigationActions } from "react-navigation";
export class CrearVisita extends Component {
  state = {
    mostrarPlanDetallado: false,
    query: ""
  };
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
      insumo,
      cantidad,
      ...rest
    } = state;
    const { visita, DATA } = this.props.navigation.state.params;

    await guardarVisitaRealizada({ ...visita, ...rest }, () =>
      this.props.navigation.goBack()
    );
  };
  setQuery = query => this.setState({ query });
  resetQuery = () => this.setState({ query: "" });
  renderInsumosItem = () => {
    const {
      DATA: { INSUMOS },
      visita
    } = this.props.navigation.state.params;
    return INSUMOS.length > 0 ? (
      INSUMOS.map(item => (
        <Picker.Item
          key={item["insumoID"]}
          label={item["insumoNombre"]}
          value={item["insumoID"]}
        />
      ))
    ) : (
      <Picker.Item label="NO TIENE ASSIGNADO NINGUN ITEM" value={""} />
    );
  };
  render() {
    const { mostrarPlanDetallado } = this.state;
    const { INSUMOS } = this.props.navigation.state.params.DATA;
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
                      <Text>
                        Fecha Tarea:{" "}
                        {state.FECHAVISITA.toString().substr(4, 12)}
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
                        androidMode={"Fecha para la visita"}
                        textStyle={{ color: "green" }}
                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                        onDateChange={setters.setFechaProximaVisita}
                      />
                      <Text>
                        Fecha Proxima Visita:
                        {state.FECHAPROXIMAVISITA.toString().substr(4, 12)}
                      </Text>
                    </Item>
                    <Item>
                      <InsumosPicker
                        state={{ ...state, query: this.state.query }}
                        setters={{
                          ...setters,
                          resetQuery: this.resetQuery,
                          setQuery: this.setQuery
                        }}
                        insumos={INSUMOS}
                      />
                    </Item>
                    <Item>
                      <ListaInsumos
                        data={state.INSUMOSGASTADOS}
                        insumos={INSUMOS}
                      />
                    </Item>
                    <GPSInput
                      value={state.COORDENADASGPS}
                      setCoordenadas={setters.setCoordenadas}
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
