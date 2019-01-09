import React, { Component } from "react";
import {
  Text,
  Form,
  Item,
  Input,
  Picker,
  Radio,
  Right,
  Left,
  Card
} from "native-base";
import { Button } from "../components/Button";
import { FormRegistrarSucursal } from "../components/FormRegistrarSucursal";
export class RegistrarSucursal extends Component {
  state = {};
  render() {
    return (
      <FormRegistrarSucursal>
        {(state, setters, resetState) => (
          <Card>
            <Form>
              <Item>
                <Input
                  value={state.NOMBRESUCURSAL}
                  onChangeText={setters.setNombreSucursal}
                  placeholder="Nombre Sucursal"
                />
              </Item>
              <Item>
                <Input
                  value={state.DIRRECCION}
                  onChangeText={setters.setDireccion}
                  placeholder="Direccion"
                />
              </Item>
              <Item disabled>
                <Input
                  disabled
                  placeholder="Coordenadas"
                  value={JSON.stringify(state.COORDENADASGPS)}
                />
              </Item>

              <Item>
                <Picker
                  note
                  mode="dropdown"
                  style={{ width: 250 }}
                  selectedValue={state.TIPOSUCURSAL}
                  onValueChange={setters.setTipoSucursal}
                  placeholder="Tipo Sucursal"
                >
                  <Picker.Item label="Local" value={1} />
                  <Picker.Item label="Nacional" value={2} />
                </Picker>
              </Item>
              <Item>
                <Input
                  value={state.AREA}
                  onChangeText={setters.setArea}
                  placeholder="Area"
                />
                <Picker
                  note
                  mode="dropdown"
                  style={{ width: 250 }}
                  selectedValue={state.AREAMEDIDA}
                  onValueChange={setters.setAreaMedida}
                  placeholder="Seleccione una medida"
                >
                  <Picker.Item label="m2/H" value={1} />
                </Picker>
              </Item>
              <Item>
                <Input
                  value={state.CONTACTO}
                  onChangeText={setters.setContacto}
                  placeholder="Contacto"
                />
              </Item>
              <Item>
                <Input
                  value={state.TELFCONTACTO}
                  onChangeText={setters.setTelfContacto}
                  placeholder="Telefono Contacto"
                />
              </Item>
              <Item>
                <Picker
                  note
                  mode="dropdown"
                  style={{ width: 250 }}
                  selectedValue={state.CATEGORIA}
                  onValueChange={setters.setCategoria}
                  placeholder="Categoria"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                    <Picker.Item label={i} key={i} value={i} />
                  ))}
                </Picker>
              </Item>
              <Item>
                <Picker
                  note
                  mode="dropdown"
                  style={{ width: 250 }}
                  selectedValue={state.VOLUMENVENTAS}
                  onValueChange={setters.setVolumenVentas}
                  placeholder="Volumen de Ventas"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                    <Picker.Item label={i} key={i} value={i} />
                  ))}
                </Picker>
              </Item>
              <Item>
                <Picker
                  note
                  mode="dropdown"
                  style={{ width: 250 }}
                  selectedValue={state.PROVEEDORPRINCIPAL}
                  onValueChange={setters.setProveedorPrincipal}
                  placeholder="Proveedor Principal"
                >
                  <Picker.Item label="Boltrack" value={1} />
                  <Picker.Item label="Monnet" value={2} />
                  <Picker.Item label="Ubicar" value={3} />
                </Picker>
              </Item>
              <Item>
                <Picker
                  note
                  mode="dropdown"
                  style={{ width: 250 }}
                  selectedValue={state.PROVEEDORSECUNDARIO}
                  onValueChange={setters.setProveedorSecundario}
                  placeholder="Proveedor Secundario 1"
                >
                  <Picker.Item label="Boltrack" value={1} />
                  <Picker.Item label="Monnet" value={2} />
                  <Picker.Item label="Ubicar" value={3} />
                </Picker>
              </Item>
              <Item>
                <Picker
                  note
                  mode="dropdown"
                  style={{ width: 250 }}
                  selectedValue={state.PROVEEDORSECUNDARIOOPT}
                  onValueChange={setters.setProveedorSecundarioOpt}
                  placeholder="Proveedor Secundario 2"
                >
                  <Picker.Item label="Boltrack" value={1} />
                  <Picker.Item label="Monnet" value={2} />
                  <Picker.Item label="Ubicar" value={3} />
                </Picker>
              </Item>
              <Item>
                <Button danger onPress={this.props.volver}>
                  Volver
                </Button>
                <Button success>Registrar</Button>
              </Item>
            </Form>
          </Card>
        )}
      </FormRegistrarSucursal>
    );
  }
}
