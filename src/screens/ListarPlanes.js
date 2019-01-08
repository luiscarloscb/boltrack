import React, { Fragment } from "react";
import { Content, Icon } from "native-base";
import { Button } from "../components/Button";
import { Lista } from "../components/Lista";

export const ListarPlanes = props => {
  //console.log(props.navigation.state.params.DATA);
  const { DATA } = props.navigation.state.params;
  const navegarVisita = visita => {
    const { navigate } = props.navigation;
    navigate("CrearVisita", { visita });
  };
  return (
    <Lista
      data={DATA}
      renderOptions={visita => {
        return (
          <Fragment>
            {visita.ESTADO == "PENDIENTE" && (
              <Button success onPress={() => navegarVisita(visita)}>
                Realizar Visita
              </Button>
            )}
            <Button danger onPress={() => {}}>
              Eliminar Visita
            </Button>
          </Fragment>
        );
      }}
    />
  );
};
