import React, { Component } from "react";
import { Location, Permissions } from "expo";
import { Item, Input } from "native-base";
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
      <Item disabled>
        <Input value={JSON.stringify(this.props.value)} />
      </Item>
    );
  }
}
