import React, { Component, Fragment } from "react";
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Picker,
  Radio,
  Card
} from "native-base";
import { Button } from "../components/Button";
import { FormRegistrarCliente } from "../components/FormRegistrarCliente";
import { RegistrarSucursal } from "./RegistrarSucursal";
export class RegistrarCliente extends Component {
  state = {
    seccion: 0
  };
  irRegistrarSucursal = () => {
    this.setState({ seccion: 1 });
  };
  volverRegistrarCliente = () => {
    this.setState({ seccion: 0 });
  };
  mostrarFormulario = () => {
    return this.state.seccion == 0 ? (
      <FormRegistrarCliente>
        {(state, setters, resetState) => (
          <Fragment>
            <Item>
              <Input
                value={state.RAZONSOCIAL}
                onChangeText={setters.setRazonSocial}
                placeholder="Razon Social"
              />
            </Item>
            <Item>
              <Picker
                note
                mode="dropdown"
                style={{ width: 250 }}
                selectedValue={state.RUBROID}
                onValueChange={setters.setRubro}
                placeholder={"RUBRO"}
                androidMode={"RUBRO"}
              >
                <Picker.Item label="RUBRO" value={""} />
                <Picker.Item label="Petrolero" value={1} />
                <Picker.Item label="Agronomico" value={2} />
                <Picker.Item label="Seguridad" value={3} />
                <Picker.Item label="Gubernamental" value={4} />
              </Picker>
            </Item>
            <Item>
              <Picker
                note
                mode="dropdown"
                style={{ width: 250 }}
                selectedValue={state.ACITIVIDADPRINCIPALID}
                onValueChange={setters.setActividadPrincipal}
                placeholder={"Actividad Principal"}
              >
                <Picker.Item label="Distribucion" value={1} />
                <Picker.Item label="Produccion" value={2} />
                <Picker.Item label="Servicios" value={3} />
              </Picker>
            </Item>
            <Item>
              <Input
                value={state.ACITIVIDADSECUNDARIA}
                onChangeText={setters.setActividadSecundaria}
                placeholder={"Actividad Secundaria 1"}
              />
            </Item>
            <Item>
              <Input
                value={state.ACITIVIDADSECUNDARIAOPT}
                onChangeText={setters.setActividadSecundariaOpt}
                placeholder={"Actividad Secudaria 2"}
              />
            </Item>
            <Item>
              <Button transparent onPress={setters.toggleIsChecked}>
                <Text>Persona Natural</Text>
              </Button>
              <Radio selected={!state.isChecked} value={1} />
            </Item>
            <Item>
              <Button transparent onPress={setters.toggleIsChecked}>
                <Text>Persona Juridica</Text>
              </Button>
              <Radio
                selected={state.isChecked}
                value={2}
                onPress={setters.toggleIsChecked}
              />
            </Item>
            <Item>
              <Input
                value={state.NIT}
                onChangeText={setters.setNIT}
                keyboardType="numeric"
                placeholder="NIT"
              />
            </Item>
            <Item>
              <Input
                value={state.REPRESENTANTELEGAL}
                onChangeText={setters.setRepresentanteLegal}
                placeholder="Representante Legal"
              />
            </Item>
            <Item>
              <Input
                value={state.LIMITECREDITO}
                onChangeText={setters.setLimiteCredito}
                placeholder="Limite de Credito"
              />
            </Item>
            <Item>
              <Input
                value={state.CODIGO}
                onChangeText={setters.setCodigo}
                placeholder="Codigo Interno"
              />
            </Item>
            <Button success onPress={() => this.irRegistrarSucursal()}>
              Siguiente
            </Button>
          </Fragment>
        )}
      </FormRegistrarCliente>
    ) : (
      <RegistrarSucursal volver={this.volverRegistrarCliente} />
    );
  };
  render() {
    return (
      <Container style={{ backgroundColor: "#EEEEEE" }}>
        <Content style={{ paddingHorizontal: 10 }}>
          <Card>{this.mostrarFormulario()}</Card>
        </Content>
      </Container>
    );
  }
}

//Asignar Vendedor cod
//asignar
//correo sucursal
