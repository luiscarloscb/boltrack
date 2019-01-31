import React, { Component, Fragment } from "react";
import { guardarPlanLocal } from "../utils/localStorageAPI";
import { Catalogo, FormPlanearVisita } from "../components";
import { CAMPANA_DATA } from "../utils/const";
import {
  Text,
  Item,
  Input,
  DatePicker,
  Label,
  Card,
  Container,
  Content,
  Button
} from "native-base";

export class CrearPlan extends Component {
  state = {
    query: "",
    catalogoClientes: false,
    catalogoTipoTarea: false,
    catalogoSucursales: false,
    catalogoTemaVisita: false,
    catalogoCampanas: false
  };

  toggleCatalogo = catalogo =>
    this.setState(state => ({ [catalogo]: !state[catalogo] }));

  guardarPlan = async (state, resetState) => {
    // Valida campos requeridos, guarda si todo esta ok
    const { insumo, cantidad, sucursales, ...rest } = state;
    const { DATA } = this.props.navigation.state.params;
    rest.IDCLIENTE == -1
      ? alert("Seleccione un cliente")
      : rest.IDSUCURSAL == -1
      ? alert("Seleccione una sucursal")
      : rest.IDCAMPANA !== -1
      ? await guardarPlanLocal({ ...rest }, () =>
          this.props.navigation.goBack()
        )
      : alert("Seleccione una campana");
  };

  render() {
    const {
      TIPOTAREAS,
      CLIENTES,
      TEMAVISITAS,
      CAMPANAS
    } = this.props.navigation.state.params.DATA;
    return (
      <Container style={{ backgroundColor: "#EEEEEE" }}>
        <Content padder style={{ paddingHorizontal: 10 }}>
          <Card>
            <FormPlanearVisita CLIENTES={CLIENTES}>
              {(state, setters, resetState) => (
                <Fragment>
                  <Item>
                    <DatePicker
                      defaultDate={new Date()}
                      minimumDate={new Date()}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      textStyle={{ color: "green" }}
                      placeHolderTextStyle={{ color: "#d3d3d3" }}
                      onDateChange={setters.setFechaTarea}
                    />
                    <Text>
                      Fecha Tarea: {state.FECHATAREA.toString().substr(4, 12)}
                    </Text>
                  </Item>
                  <Item>
                    <DatePicker
                      defaultDate={new Date()}
                      minimumDate={new Date()}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      textStyle={{ color: "green" }}
                      placeHolderTextStyle={{ color: "#d3d3d3" }}
                      onDateChange={setters.setFechaPlanificada}
                    />
                    <Text>
                      Fecha Planificada:{" "}
                      {state.FECHAPLANIFICADA.toString().substr(4, 12)}
                    </Text>
                  </Item>
                  <Item>
                    <Catalogo
                      placeholder="Campaña"
                      data={CAMPANAS}
                      seleccionarItem={setters.setCampana}
                      toggleCatalogo={() =>
                        this.toggleCatalogo("catalogoCampanas")
                      }
                      visible={this.state.catalogoCampanas}
                      label="campanaNombre"
                      value="campanaID"
                    />
                  </Item>
                  <Item>
                    <Catalogo
                      placeholder="Cliente"
                      data={CLIENTES}
                      seleccionarItem={setters.setCliente}
                      toggleCatalogo={() =>
                        this.toggleCatalogo("catalogoClientes")
                      }
                      visible={this.state.catalogoClientes}
                      label="clienteNom"
                      value="clienteID"
                    />
                  </Item>
                  <Item>
                    <Catalogo
                      placeholder="Sucursales"
                      data={state.sucursales}
                      seleccionarItem={setters.setSucursal}
                      toggleCatalogo={() =>
                        this.toggleCatalogo("catalogoSucursales")
                      }
                      visible={this.state.catalogoSucursales}
                      label="sucursalNom"
                      value="sucursalId"
                    />
                  </Item>
                  <Item>
                    <Catalogo
                      placeholder="Tipo Tarea"
                      data={TIPOTAREAS}
                      seleccionarItem={setters.setTipoTarea}
                      toggleCatalogo={() =>
                        this.toggleCatalogo("catalogoTipoTarea")
                      }
                      visible={this.state.catalogoTipoTarea}
                      label="tareaNombre"
                      value="tareaID"
                    />
                  </Item>

                  <Item>
                    <Input
                      placeholder="Contacto"
                      value={state.CONTACTO}
                      onChangeText={setters.setContacto}
                    />
                  </Item>
                  <Item>
                    <Catalogo
                      placeholder="Tema Visita"
                      data={TEMAVISITAS}
                      seleccionarItem={setters.setTemaVisita}
                      toggleCatalogo={() =>
                        this.toggleCatalogo("catalogoTemaVisita")
                      }
                      visible={this.state.catalogoTemaVisita}
                      label="temaNombre"
                      value="temaID"
                    />
                  </Item>
                  <Item>
                    <Item stackedLabel>
                      <Label>Desarrollo de la Tarea</Label>
                      <Input
                        multiline
                        value={state.DESARROLLOTAREA}
                        onChangeText={setters.setDesarrolloTarea}
                        width={250}
                      />
                    </Item>
                  </Item>
                  <Item stackedLabel>
                    <Label>Objetivo</Label>
                    <Input
                      multiline
                      value={state.OBJETIVO}
                      onChangeText={setters.setObjetivo}
                      width={250}
                    />
                  </Item>
                  <Button
                    success
                    block
                    onPress={() => this.guardarPlan(state, resetState)}
                  >
                    <Text>Guardar Plan</Text>
                  </Button>
                </Fragment>
              )}
            </FormPlanearVisita>
          </Card>
        </Content>
      </Container>
    );
  }
}
