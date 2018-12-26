import React, { Component } from "react";
import { _storeData } from "../utils/localStorageAPI";
import { SHA256 } from "crypto-js";
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
    fechaTarea: new Date(),
    fechaPlanificada: new Date(),
    tipoTarea: "",
    cliente: "",
    sucursal: "",
    temaVisita: "",
    insumo: "",
    cantidad: "",
    desarrolloTarea: "",
    objetivo: "",
    insumos: []
  };
  setFechaTarea = fechaTarea => this.setState({ fechaTarea });
  setFechaPlanificada = fechaPlanificada => this.setState({ fechaPlanificada });
  setTipoTarea = tipoTarea => this.setState({ tipoTarea });
  setCliente = cliente => this.setState({ cliente });
  setSucursal = sucursal => this.setState({ sucursal });
  setTemaVisita = temaVisita => this.setState({ temaVisita });
  setCantidad = cantidad => this.setState({ cantidad });
  setInsumo = insumo => this.setState({ insumo });
  setDesarrolloTarea = desarrolloTarea => this.setState({ desarrolloTarea });
  setObjetivo = objetivo => this.setState({ objetivo });

  addInsumo = () => {
    let nuevoInsumo = { insumo: this.state.insumo, monto: this.state.monto };
    this.setState(state => {
      return {
        insumos: state.insumos.concat(nuevoInsumo),
        insumo: "",
        monto: ""
      };
    });
  };

  guardarPlan = () => {
    const { insumo, monto, ...rest } = this.state;
    const block = Object.assign({}, rest);
    const blockHash = SHA256(JSON.stringify(block));
    console.log("block: " + JSON.stringify(block));
    console.log("blockHash: " + blockHash);
  };
  render() {
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
                Fecha Tarea: {this.state.fechaTarea.toString().substr(4, 12)}
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
                {this.state.fechaPlanificada.toString().substr(4, 12)}
              </Text>
            </Item>
            <Item>
              <Picker
                note
                mode="dropdown"
                style={{ width: 120 }}
                selectedValue={this.state.tipoTarea}
                onValueChange={this.setTipoTarea}
                placeholder={"Tipo Tarea"}
              >
                <Picker.Item label="Wallet" value="key0" />
                <Picker.Item label="ATM Card" value="key1" />
                <Picker.Item label="Debit Card" value="key2" />
                <Picker.Item label="Credit Card" value="key3" />
                <Picker.Item label="Net Banking" value="key4" />
              </Picker>
            </Item>
            <Item>
              <Picker
                note
                mode="dropdown"
                style={{ width: 120 }}
                selectedValue={this.state.cliente}
                onValueChange={this.setCliente}
                placeholder={"Cliente"}
              >
                <Picker.Item label="Wallet" value="key0" />
                <Picker.Item label="ATM Card" value="key1" />
                <Picker.Item label="Debit Card" value="key2" />
                <Picker.Item label="Credit Card" value="key3" />
                <Picker.Item label="Net Banking" value="key4" />
              </Picker>
            </Item>
            <Item>
              <Picker
                note
                mode="dropdown"
                style={{ width: 120 }}
                selectedValue={this.state.sucursal}
                onValueChange={this.setSucursal}
                placeholder={"Sucursal"}
              >
                <Picker.Item label="Wallet" value="key0" />
                <Picker.Item label="ATM Card" value="key1" />
                <Picker.Item label="Debit Card" value="key2" />
                <Picker.Item label="Credit Card" value="key3" />
                <Picker.Item label="Net Banking" value="key4" />
              </Picker>
            </Item>
            <Item disabled>
              <Input disabled placeholder="Contacto" />
            </Item>
            <Item>
              <Picker
                note
                mode="dropdown"
                style={{ width: 120 }}
                selectedValue={this.state.temaVisita}
                onValueChange={this.setTemaVisita}
                placeholder={"Tema Visita"}
              >
                <Picker.Item label="Wallet" value="key0" />
                <Picker.Item label="ATM Card" value="key1" />
                <Picker.Item label="Debit Card" value="key2" />
                <Picker.Item label="Credit Card" value="key3" />
                <Picker.Item label="Net Banking" value="key4" />
              </Picker>
            </Item>
            <Item>
              <Picker
                note
                mode="dropdown"
                style={{ width: 120 }}
                selectedValue={this.state.insumo}
                onValueChange={this.setInsumo}
                placeholder={"Insumos"}
              >
                <Picker.Item label="Wallet" value="key0" />
                <Picker.Item label="ATM Card" value="key1" />
                <Picker.Item label="Debit Card" value="key2" />
                <Picker.Item label="Credit Card" value="key3" />
                <Picker.Item label="Net Banking" value="key4" />
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
                dataArray={this.state.insumos}
                renderRow={item => (
                  <ListItem>
                    <Text>
                      {"NOMBRE: " + item.insumo + "CANTIDAD: " + item.cantidad}
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
                  value={this.state.desarrolloTarea}
                  onChangeText={this.setdesarrolloTarea}
                />
              </Item>
            </Item>
            <Item stackedLabel>
              <Label>Objetivo</Label>
              <Input
                multiline
                value={this.state.objetivo}
                onChangeText={this.setObjetivo}
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
