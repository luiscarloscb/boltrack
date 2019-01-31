import React, { Component, Fragment } from "react";
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Radio,
  Card,
  Button
} from "native-base";
import { RegistrarSucursal } from "./RegistrarSucursal";
import { Catalogo, FormRegistrarCliente } from "../components";
export class RegistrarCliente extends Component {
  state = {
    seccion: 0,
    catalogoActividades: false,
    catalogoEmpleados: false,
    catalogoRubros: false
  };

  toggleCatalogo = catalogo =>
    this.setState(state => ({ [catalogo]: !state[catalogo] }));
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
              <Input
                value={state.CORREO}
                onChangeText={setters.setCorreo}
                placeholder="Correo"
              />
            </Item>
            <Item>
              <Catalogo
                placeholder="RUBRO"
                data={[
                  { rubroNom: "PETROLERO", rubroID: 1 },
                  { rubroNom: "AGRONOMICO", rubroID: 2 }
                ]}
                seleccionarItem={setters.setRubro}
                toggleCatalogo={() => this.toggleCatalogo("catalogoRubros")}
                visible={this.state.catalogoRubros}
                label="rubroNom"
                value="rubroID"
              />
            </Item>
            <Item>
              <Item>
                <Catalogo
                  placeholder="Actividad"
                  data={[
                    { actividadNom: "DISTRIBUCION", actividadID: 1 },
                    { actividadNom: "SERVICIOS", actividadID: 2 }
                  ]}
                  seleccionarItem={setters.setActividadPrincipal}
                  toggleCatalogo={() =>
                    this.toggleCatalogo("catalogoActividades")
                  }
                  visible={this.state.catalogoActividades}
                  label="actividadNom"
                  value="actividadID"
                />
              </Item>
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
              <Catalogo
                placeholder="Asignar Empleado"
                data={[
                  { empleadoNom: "Ramon Gonzales", empleadoID: 1 },
                  { empleadoNom: "Juan Perez", empleadoID: 2 }
                ]}
                seleccionarItem={setters.setEmpleado}
                toggleCatalogo={() => this.toggleCatalogo("catalogoEmpleados")}
                visible={this.state.catalogoEmpleados}
                label="empleadoNom"
                value="empleadoID"
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
              <Text>Siguiente</Text>
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
