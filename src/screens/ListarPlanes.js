import React from "react";
import { Content, Icon } from "native-base";
import { Button } from "../components/Button";
import { Lista } from "../components/Lista";

export const ListarPlanes = props => {
  //console.log(props.navigation.state.params.DATA);
  const { DATA } = props.navigation.state.params;
  console.log(DATA);
  return (
    <Lista
      data={DATA}
      renderOptions={visita => {
        return (
          <Content>
            {visita.ESTADO == "PENDIENTE" && (
              <Button
                success
                style={{ alignContent: "center" }}
                onPress={() => {}}
              >
                <Icon name="ios-add" color="white" />
              </Button>
            )}
            <Button
              danger
              style={{ alignContent: "center" }}
              onPress={() => {}}
            >
              <Icon name="ios-remove" color="white" />
            </Button>
          </Content>
        );
      }}
    />
  );
};
