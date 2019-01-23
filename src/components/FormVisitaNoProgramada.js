import React, { Component, Fragment } from "react";
import {
  Form,
  Card,
  Item,
  DatePicker,
  Thumbnail,
  Text,
  Label,
  Input,
  Button,
  Picker
} from "native-base";
import { FormRealizarVisita } from "./FormRealizarVisita";
import { guardarVisitaRealizada } from "../utils/localStorageAPI";
import { uuidv4 } from "../utils/helpers";
import { InsumosPicker } from "./InsumosPicker";
import { ListaInsumos } from "./ListaInsumos";
import { GPSInput } from "./GPSInput";
export class FormVisitaNoProgramada extends Component {
  state = {
    IDCLIENTE: -1,
    IDSUCURSAL: -1,
    sucursales: [],
    query: ""
  };
  setQuery = query => this.setState({ query });
  resetQuery = () => this.setState({ query: "" });
  setCliente = IDCLIENTE =>
    this.setState(() => ({
      IDCLIENTE,
      sucursales: this.encontrarSucursal(IDCLIENTE)
    }));

  setSucursal = IDSUCURSAL => {
    this.setState({
      IDSUCURSAL
    });
  };
  renderInsumosItem = () => {
    const { INSUMOS } = this.props;
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
  encontrarSucursal = IDCLIENTE => {
    // Encuentra las sucursales disponibles por cliente seleccionado
    const { CLIENTES } = this.props;
    const cliente = CLIENTES.find(cliente => cliente.clienteID == IDCLIENTE);
    return cliente ? cliente.sucursales : [];
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
    const { IDCLIENTE, IDSUCURSAL } = this.state;
    await guardarVisitaRealizada(
      { ...rest, ...this.state, IDCLIENTE, IDSUCURSAL, IDVISITA: uuidv4() },
      () => this.props.goBack()
    );
  };
  resetState = () => this.setState({ IDCLIENTE: -1, IDSUCURSAL: -1 });
  getSetters = () => ({
    setCliente: this.setCliente,
    setSucursal: this.setSucursal
  });
  render() {
    const { INSUMOS } = this.props;
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
                <ListaInsumos data={state.INSUMOSGASTADOS} insumos={INSUMOS} />
              </Item>
              <GPSInput
                setCoordenadas={setters.setCoordenadas}
                value={state.COORDENADASGPS}
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
