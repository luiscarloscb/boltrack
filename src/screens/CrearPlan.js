import React, { Component, Fragment } from "react";
import { guardarPlanLocal } from "../utils/localStorageAPI";
import { FormPlanearVisita } from "../components/FormPlanearVisita";
import { InsumosPicker } from "../components/InsumosPicker";
import { ListaInsumos } from "../components/ListaInsumos";
import {
  Text,
  Item,
  Input,
  DatePicker,
  Picker,
  Label,
  Body,
  Header,
  Card,
  Left,
  Icon,
  Right,
  Container,
  Content
} from "native-base";
import { Button } from "../components/Button";
import { StackActions, NavigationActions } from "react-navigation";
import { SearchBar } from "../components/SearchBar";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";
export class CrearPlan extends Component {
  state = { query: "" };
  componentWillUnmount = () => this.setState({ query: "" });
  setQuery = query => this.setState({ query });
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
  filterArrayByQuery = (arr, keys) => {
    const { query } = this.state;

    let showingItems;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      showingItems = arr.filter(item => match.test(item[keys[1]]));
    } else {
      showingItems = arr;
    }

    return showingItems.sort(sortBy(keys[1]));
  };
  renderPickerItem = (arr, keys) => {
    // Renderiza las opciones disponibles de un array de objectos [{ID, NOMBRE}]
    const showingItems = this.filterArrayByQuery(arr, keys);
    return showingItems.length > 0 ? (
      showingItems.map(item => (
        <Picker.Item
          key={item[keys[1]]}
          label={item[keys[1]]}
          value={item[keys[0]]}
        />
      ))
    ) : (
      <Picker.Item label="NO TIENE ASSIGNADO NINGUN ITEM" value={""} />
    );
  };
  resetQuery = () => this.setState({ query: "" });
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
                    <Picker
                      mode="dropdown"
                      style={{ width: 250 }}
                      selectedValue={state.IDTIPOTAREA}
                      onValueChange={value => {
                        this.resetQuery();
                        setters.setTipoTarea(value);
                      }}
                      placeholder={"Tipo Tarea"}
                      renderHeader={backAction => (
                        <Header>
                          <Left>
                            <Button transparent onPress={backAction}>
                              <Icon
                                name="ios-arrow-back"
                                style={{ color: "black" }}
                              />
                            </Button>
                          </Left>
                          <Body style={{ flex: 3 }}>
                            <SearchBar
                              value={this.state.query}
                              onChangeText={this.setQuery}
                            />
                          </Body>
                          <Right />
                        </Header>
                      )}
                    >
                      {this.renderPickerItem(TIPOTAREAS, [
                        "tareaID",
                        "tareaNombre"
                      ])}
                    </Picker>
                  </Item>
                  <Item>
                    <Picker
                      note
                      mode="dropdown"
                      style={{ width: 250 }}
                      selectedValue={state.IDCLIENTE}
                      onValueChange={value => {
                        this.resetQuery();
                        setters.setCliente(value);
                      }}
                      placeholder={"Cliente"}
                      renderHeader={backAction => (
                        <Header>
                          <Left>
                            <Button transparent onPress={backAction}>
                              <Icon
                                name="ios-arrow-back"
                                style={{ color: "black" }}
                              />
                            </Button>
                          </Left>
                          <Body style={{ flex: 3 }}>
                            <SearchBar
                              value={this.state.query}
                              onChangeText={this.setQuery}
                            />
                          </Body>
                          <Right />
                        </Header>
                      )}
                    >
                      {this.renderPickerItem(CLIENTES, [
                        "clienteID",
                        "clienteNom"
                      ])}
                    </Picker>
                  </Item>
                  <Item>
                    <Picker
                      note
                      mode="dropdown"
                      style={{ width: 250 }}
                      selectedValue={state.IDSUCURSAL}
                      onValueChange={value => {
                        this.resetQuery();
                        setters.setSucursal(value);
                      }}
                      renderHeader={backAction => (
                        <Header>
                          <Left>
                            <Button transparent onPress={backAction}>
                              <Icon
                                name="ios-arrow-back"
                                style={{ color: "black" }}
                              />
                            </Button>
                          </Left>
                          <Body style={{ flex: 3 }}>
                            <SearchBar
                              value={this.state.query}
                              onChangeText={this.setQuery}
                            />
                          </Body>
                          <Right />
                        </Header>
                      )}
                      placeholder={"Sucursal"}
                    >
                      {this.renderPickerItem(state.sucursales, [
                        "sucursalId",
                        "sucursalNom"
                      ])}
                    </Picker>
                  </Item>
                  <Item disabled>
                    <Input
                      disabled
                      placeholder="Contacto"
                      value={state.contacto}
                    />
                  </Item>
                  <Item>
                    <Picker
                      note
                      mode="dropdown"
                      style={{ width: 250 }}
                      selectedValue={state.IDTEMAVISITA}
                      onValueChange={value => {
                        this.resetQuery();
                        setters.setTemaVisita(value);
                      }}
                      renderHeader={backAction => (
                        <Header>
                          <Left>
                            <Button transparent onPress={backAction}>
                              <Icon
                                name="ios-arrow-back"
                                style={{ color: "black" }}
                              />
                            </Button>
                          </Left>
                          <Body style={{ flex: 3 }}>
                            <SearchBar
                              value={this.state.query}
                              onChangeText={this.setQuery}
                            />
                          </Body>
                          <Right />
                        </Header>
                      )}
                      placeholder={"Tema Visita"}
                    >
                      {this.renderPickerItem(TEMAVISITAS, [
                        "temaID",
                        "temaNombre"
                      ])}
                    </Picker>
                  </Item>
                  <Item>
                    <InsumosPicker
                      state={{ ...state, query: this.state.query }}
                      setters={{
                        ...setters,
                        setQuery: this.setQuery,
                        resetQuery: this.resetQuery
                      }}
                      renderPickerItem={() =>
                        this.renderPickerItem(INSUMOS, [
                          "insumoID",
                          "insumoNombre"
                        ])
                      }
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
