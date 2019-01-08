import React from "react";
import { Content, Icon } from "native-base";
import { Button } from "../components/Button";
import { Lista } from "../components/Lista";

export const ListarVisitas = props => {
  const { DATA } = props.navigation.state.params;
  DATA.VISITASPLANEADAS = DATA.VISITASPLANEADAS.filter(visita =>
    console.log(visita)
  );
  return (
    <Lista
      data={DATA}
      renderOptions={visita => {
        return (
          <Button info style={{ alignContent: "center" }} onPress={() => {}}>
            <Icon name="ios-cloud-upload" color="white" />
          </Button>
        );
      }}
    />
  );
};
