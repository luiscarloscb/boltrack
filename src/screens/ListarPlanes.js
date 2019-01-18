import React, { Fragment, Component } from "react";
import { Text } from "native-base";
import { Button } from "../components/Button";
import { Lista } from "../components/Lista";
import { eliminarVisita } from "../utils/localStorageAPI";
import { Confirm } from "../components/Confirm";

export class ListarPlanes extends Component {
  state = { isModalVisible: false };
  setIsModalVisible = () =>
    this.setState(state => ({ isModalVisible: !state.isModalVisible }));
  navegarVisita = visita => {
    const { navigate } = this.props.navigation;
    const { DATA } = this.props.navigation.state.params;
    navigate("CrearVisita", { visita, DATA });
  };
  render() {
    const { DATA } = this.props.navigation.state.params;
    return (
      <Lista
        data={DATA}
        estado={"PENDIENTE"}
        renderOptions={visita => {
          return (
            <Fragment>
              {visita.ESTADO == "PENDIENTE" && (
                <Button success onPress={() => this.navegarVisita(visita)}>
                  Realizar Visita
                </Button>
              )}
              {visita.CARGADO ? (
                <Text> En Servidor </Text>
              ) : (
                <Button danger onPress={this.setIsModalVisible}>
                  Eliminar Visita
                </Button>
              )}
              <Confirm
                onDecline={this.setIsModalVisible}
                onAccept={() => {
                  eliminarVisita(visita.IDVISITA, () =>
                    alert("El plan se elimino correctamente")
                  );
                  this.setIsModalVisible();
                }}
                visible={this.state.isModalVisible}
              >
                Estas Seguro que deseas eliminar esta visita?
              </Confirm>
            </Fragment>
          );
        }}
      />
    );
  }
}
