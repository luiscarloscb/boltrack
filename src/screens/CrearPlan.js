import React, { Component, Fragment } from "react";
import { guardarPlanLocal } from "../utils/localStorageAPI";
import {
  Catalogo,
  InsumosPicker,
  ListaInsumos,
  FormPlanearVisita
} from "../components";
import {
  Text,
  Item,
  Input,
  DatePicker,
  Picker,
  Label,
  Card,
  Container,
  Content
} from "native-base";
import { Button } from "../components/Button";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";
export class CrearPlan extends Component {
  state = {
    query: "",
    catalogoClientes: false,
    catalogoTipoTarea: false,
    catalogoSucursales: false,
    catalogoTemaVisita: false
  };

  toggleCatalogo = catalogo =>
    this.setState(state => ({ [catalogo]: !state[catalogo] }));

  guardarPlan = async (state, resetState) => {
    // Valida campos requeridos, guarda si todo esta ok
    const { insumo, cantidad, sucursales, contacto, ...rest } = state;
    const { DATA } = this.props.navigation.state.params;
    rest.IDCLIENTE == -1
      ? alert("Seleccione un cliente")
      : rest.IDSUCURSAL == -1
      ? alert("Seleccione una sucursal")
      : await guardarPlanLocal({ ...rest }, () =>
          this.props.navigation.goBack()
        );
  };

  render() {
    const {
      TIPOTAREAS,
      CLIENTES,
      TEMAVISITAS,
      INSUMOS,
      ...rest
    } = this.props.navigation.state.params.DATA;
    return (
      <Container style={{ backgroundColor: "#EEEEEE" }}>
        <Content style={{ paddingHorizontal: 10 }}>
          <Card>
            <FormPlanearVisita clientes={CLIENTES}>
              {(state, setters, resetState) => (
                <Fragment>
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
                      androidMode={"Fecha Planificada"}
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
                  <Item disabled>
                    <Input
                      disabled
                      placeholder="Contacto"
                      value={state.contacto}
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
                    <InsumosPicker
                      state={{ ...state, query: this.state.query }}
                      setters={{
                        ...setters,
                        setQuery: this.setQuery,
                        resetQuery: this.resetQuery
                      }}
                      insumos={INSUMOS}
                    />
                  </Item>
                  <Item>
                    <ListaInsumos data={state.INSUMOS} insumos={INSUMOS} />
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
                    Guardar Plan
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
