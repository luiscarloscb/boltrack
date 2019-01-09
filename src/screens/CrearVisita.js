import React, { Component, Fragment } from "react";

import {
  Thumbnail,
  Text,
  Form,
  Item,
  Input,
  DatePicker,
  Label,
  Picker,
  Card,
  List,
  ListItem
} from "native-base";
import { Button } from "../components/Button";
import { FormRealizarVisita } from "../components/FormRealizarVisita";
import { VisitaDetalles } from "../components/VisitaDetalles";
import { InsumosPicker } from "../components/InsumosPicker";
import { ListaInsumos } from "../components/ListaInsumos";
import { guardarVisitaRealizada } from "../utils/localStorageAPI";
import { StackActions, NavigationActions } from "react-navigation";
export class CrearVisita extends Component {
  state = {
    mostrarPlanDetallado: false
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

    //Limpiando el stack de rutas
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "ListarVisitas",
          params: { DATA }
        })
      ]
    });

    await guardarVisitaRealizada({ ...visita, ...rest }, () =>
      this.props.navigation.goBack()
    );
  };
  renderInsumosItem = () => {
    const {
      DATA: { INSUMOS },
      visita
    } = this.props.navigation.state.params;
    const insumosDisponibles = visita.INSUMOS.map(
      insumoVisita =>
        INSUMOS.map(insumoData => {
          if (insumoVisita.insumoID == insumoData.insumoID) {
            return {
              insumoNombre: insumoData.insumoNombre,
              insumoID: insumoVisita.insumoID,
              cantidad: insumoVisita.cantidad
            };
          }
        })[0]
    );
    return insumosDisponibles.length > 0 ? (
      insumosDisponibles.map(item => (
        <Picker.Item
          key={item["insumoID"]}
          label={item["insumoNombre"]}
          value={item["insumoID"]}
        />
      ))
    ) : (
      <Picker.Item label="NO TIENE ASSIGNADO NINGUN ITEM" value={null} />
    );
  };
  render() {
    const { mostrarPlanDetallado } = this.state;
    const { INSUMOS } = this.props.navigation.state.params.DATA;
    return (
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
            <Card>
              <Form>
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
                    Fecha Tarea: {state.FECHAVISITA.toString().substr(4, 12)}
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
                    Fecha Tarea:
                    {state.FECHAPROXIMAVISITA.toString().substr(4, 12)}
                  </Text>
                </Item>
                <Item>
                  <InsumosPicker
                    state={state}
                    setters={setters}
                    renderPickerItem={this.renderInsumosItem}
                  />
                </Item>
                <Item>
                  <ListaInsumos
                    data={state.INSUMOSGASTADOS}
                    insumos={INSUMOS}
                  />
                </Item>
                <Item disabled>
                  <Input
                    disabled
                    placeholder="Coordenadas"
                    value={JSON.stringify(state.COORDENADASGPS)}
                  />
                </Item>
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
                <Button success full onPress={() => this.guardarVisita(state)}>
                  Guardar Visita
                </Button>
              </Form>
            </Card>
          )}
        </FormRealizarVisita>
      </Fragment>
    );
  }
}
