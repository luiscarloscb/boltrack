import React, { Component } from "react";
import { guardarPlanLocal } from "../utils/localStorageAPI";
import {
  Text,
  Container,
  Content,
  Form,
  Item,
  Input,
  DatePicker,
  Picker,
  Icon,
  Label,
  List,
  ListItem
} from "native-base";
import { Button } from "../components/Button";
export class CrearPlan extends Component {
  state = {
    FECHATAREA: new Date(),
    FECHAPLANIFICADA: new Date(),
    IDTIPOTAREA: -1,
    IDCLIENTE: -1,
    IDSUCURSAL: -1,
    IDTEMAVISITA: -1,
    insumo: -1,
    cantidad: "0",
    DESARROLLOTAREA: "",
    OBJETIVO: "",
    INSUMOS: [],
    sucursales: []
  };

  setFechaTarea = FECHATAREA => this.setState({ FECHATAREA });
  setFechaPlanificada = FECHAPLANIFICADA => this.setState({ FECHAPLANIFICADA });
  setTipoTarea = IDTIPOTAREA => this.setState({ IDTIPOTAREA });
  setCliente = IDCLIENTE => {
    this.setState(state => {
      return { IDCLIENTE, sucursales: this.encontrarSucursal(IDCLIENTE) };
    });
  };
  setSucursal = IDSUCURSAL => this.setState({ IDSUCURSAL });
  setTemaVisita = IDTEMAVISITA => this.setState({ IDTEMAVISITA });
  setCantidad = cantidad => this.setState({ cantidad });
  setInsumo = insumo => this.setState({ insumo });
  setDesarrolloTarea = DESARROLLOTAREA => this.setState({ DESARROLLOTAREA });
  setObjetivo = OBJETIVO => this.setState({ OBJETIVO });

  addInsumo = () => {
    //Agrega el insumo y la cantidad seleccionada en la lista INSUMOS
    let nuevoInsumo = {
      insumo: this.state.insumo,
      cantidad: parseInt(this.state.cantidad)
    };
    this.setState(state => {
      return {
        INSUMOS: state.INSUMOS.concat(nuevoInsumo),
        insumo: "",
        cantidad: ""
      };
    });
  };
  resetState = () =>
    //Vuelve el state a su estado original
    this.setState({
      FECHATAREA: new Date(),
      FECHAPLANIFICADA: new Date(),
      IDTIPOTAREA: -1,
      IDCLIENTE: -1,
      IDSUCURSAL: -1,
      IDTEMAVISITA: -1,
      insumo: -1,
      cantidad: "0",
      DESARROLLOTAREA: "",
      OBJETIVO: "",
      INSUMOS: [],
      sucursales: []
    });
  guardarPlan = async () => {
    // Valida campos requeridos, guarda si todo esta ok
    const { insumo, cantidad, sucursales, ...rest } = this.state;
    rest.IDCLIENTE == -1
      ? alert("Seleccione un cliente")
      : rest.IDSUCURSAL == -1
      ? alert("Seleccione una sucursal")
      : await guardarPlanLocal({ ...rest }, this.resetState);
  };

  renderPickerItem = (arr, keys) => {
    // Renderiza las opciones disponibles de un array de objectos [{ID, NOMBRE}]
    return arr.length > 0 ? (
      arr.map(item => (
        <Picker.Item
          key={item[keys[1]]}
          label={item[keys[1]]}
          value={item[keys[0]]}
        />
      ))
    ) : (
      <Picker.Item label="NO TIENE ASSIGNADO NINGUN ITEM" value={null} />
    );
  };

  encontrarSucursal = clienteSel => {
    // Encuentra las sucursales disponibles por cliente seleccionado
    const { CLIENTES } = this.props.navigation.state.params.DATA;
    const cliente = CLIENTES.find(cliente => cliente.clienteID == clienteSel);
    return cliente ? cliente.sucursales : [];
  };

  encontrarContacto = SUCURSALES => {
    // Encuentra el contacto para la sucursal seleccionada
    const sucursal = SUCURSALES.find(
      sucur => sucur.sucursalId == this.state.IDSUCURSAL
    );
    return sucursal
      ? sucursal.sucursalContacto
      : "Seleccione primero una sucursal";
  };

  render() {
    const {
      TIPOTAREAS,
      CLIENTES,
      TEMAVISITAS,
      INSUMOS
    } = this.props.navigation.state.params.DATA;
    return (
      <Container>
        <Content>
          <Form>
            <Item>
              <DatePicker
                defaultDate={new Date()}
                minimumDate={new Date()}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"Fecha para la tarea"}
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={this.setFechaTarea}
              />
              <Text>
                Fecha Tarea: {this.state.FECHATAREA.toString().substr(4, 12)}
              </Text>
            </Item>
            <Item>
              <DatePicker
                defaultDate={new Date()}
                minimumDate={new Date()}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"Fecha Planificada"}
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={this.setFechaPlanificada}
              />
              <Text>
                Fecha Planificada:
                {this.state.FECHAPLANIFICADA.toString().substr(4, 12)}
              </Text>
            </Item>
            <Item>
              <Picker
                note
                mode="dropdown"
                style={{ width: 250 }}
                selectedValue={this.state.IDTIPOTAREA}
                onValueChange={this.setTipoTarea}
                placeholder={"Tipo Tarea"}
              >
                {this.renderPickerItem(TIPOTAREAS, ["tareaID", "tareaNombre"])}
              </Picker>
            </Item>
            <Item>
              <Picker
                note
                mode="dropdown"
                style={{ width: 250 }}
                selectedValue={this.state.IDCLIENTE}
                onValueChange={this.setCliente}
                placeholder={"Cliente"}
              >
                {this.renderPickerItem(CLIENTES, ["clienteID", "clienteNom"])}
              </Picker>
            </Item>
            <Item>
              <Picker
                note
                mode="dropdown"
                style={{ width: 250 }}
                selectedValue={this.state.IDSUCURSAL}
                onValueChange={this.setSucursal}
                placeholder={"Sucursal"}
              >
                {this.renderPickerItem(this.state.sucursales, [
                  "sucursalId",
                  "sucursalNom"
                ])}
              </Picker>
            </Item>
            <Item disabled>
              <Input
                disableds
                placeholder="Contacto"
                value={this.encontrarContacto(this.state.sucursales)}
              />
            </Item>
            <Item>
              <Picker
                note
                mode="dropdown"
                style={{ width: 250 }}
                selectedValue={this.state.IDTEMAVISITA}
                onValueChange={this.setTemaVisita}
                placeholder={"Tema Visita"}
              >
                {this.renderPickerItem(TEMAVISITAS, ["temaID", "temaNombre"])}
              </Picker>
            </Item>
            <Item>
              <Picker
                note
                mode="dropdown"
                style={{ width: 250 }}
                selectedValue={this.state.insumo}
                onValueChange={this.setInsumo}
                placeholder={"Insumos"}
              >
                {this.renderPickerItem(INSUMOS, ["insumoID", "insumoNombre"])}
              </Picker>

              <Input
                value={this.state.cantidad}
                onChangeText={this.setCantidad}
                placeholder="Cantidad"
                keyboardType="numeric"
              />

              <Button
                success
                style={{ alignContent: "center" }}
                onPress={this.addInsumo}
              >
                <Icon name="ios-add" color="white" />
              </Button>
            </Item>
            <Item>
              <List
                dataArray={this.state.INSUMOS}
                renderRow={item => (
                  <ListItem>
                    <Text>
                      {"NOMBRE: " +
                        INSUMOS.find(insumo => insumo.insumoID == item.insumo)
                          .insumoNombre +
                        "    " +
                        "CANTIDAD: " +
                        item.cantidad.toString()}
                    </Text>
                  </ListItem>
                )}
              />
            </Item>
            <Item>
              <Item stackedLabel>
                <Label>Desarrollo de la Tarea</Label>
                <Input
                  multiline
                  value={this.state.DESARROLLOTAREA}
                  onChangeText={this.setDesarrolloTarea}
                  width={250}
                />
              </Item>
            </Item>
            <Item stackedLabel>
              <Label>Objetivo</Label>
              <Input
                multiline
                value={this.state.OBJETIVO}
                onChangeText={this.setObjetivo}
                width={250}
              />
            </Item>
            <Item>
              <Button success full onPress={this.guardarPlan}>
                Guardar Plan
              </Button>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
