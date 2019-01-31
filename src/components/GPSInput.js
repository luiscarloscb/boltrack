import React, { Component, Fragment } from "react";
import { Location, Permissions } from "expo";
import { Item, Input, Button, Text, Radio } from "native-base";
export class GPSInput extends Component {
  componentDidMount = async () => {
    Permissions.askAsync(Permissions.LOCATION).then(({ status }) => {
      if (status === "granted") {
        return this.obtenerCoordenadas();
      } else {
        alert("La aplicacion no tiene permisos para acceder a tu ubicacion.");
      }
    });
  };
  obtenerCoordenadas = async () => {
    Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        timeInterval: 1,
        distanceInterval: 1
      },
      ({ coords }) => {
        const { latitude, longitude } = coords;
        this.props.setCoordenadas([latitude, longitude]);
      }
    );
  };

  render() {
    return (
      <Fragment>
        <Item>
          <Button transparent onPress={this.props.onEnableGPS}>
            <Text>Enviar Informacion GPS</Text>
          </Button>
          <Radio selected={this.props.isGpsEnable} value={1} />
        </Item>
        {this.props.isGpsEnable ? (
          <Item disabled>
            <Input value={JSON.stringify(this.props.value)} />
          </Item>
        ) : (
          <Text>"No GPS Habilitado"</Text>
        )}
      </Fragment>
    );
  }
}
