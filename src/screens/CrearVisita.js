import React, { Component } from "react";
import { Platform, Image } from "react-native";
import { Constants, Location, Permissions } from "expo";
import {
  Thumbnail,
  Text,
  Container,
  Content,
  Form,
  Item,
  Input,
  DatePicker,
  Picker,
  Icon,
  Label
} from "native-base";
import { Button } from "../components/Button";
import { Camara } from "../components/Camera";
export class CrearVisita extends Component {
  state = {
    FECHAVISITA: "",
    LOGROSVISITA: "",
    FECHAPROXIMAVISITA: "",
    COORDENADASGPS: [],
    IMAGENES: [],
    errorMessage: "",
    status: "",
    mostrarCamara: false,
    camaraCargando: false
  };

  setFechaVisita = FECHAVISITA => this.setState({ FECHAVISITA });
  setFechaProximaVisita = FECHAPROXIMAVISITA =>
    this.setState({ FECHAPROXIMAVISITA });
  setLogroVisita = LOGROSVISITA => this.setState({ LOGROSVISITA });
  setImagen = IMAGEN =>
    this.setState(state => ({
      IMAGENES: state.IMAGENES.concat(IMAGEN),
      mostrarCamara: false,
      camaraCargando: false
    }));

  componentDidMount() {
    Permissions.getAsync(Permissions.LOCATION)
      .then(({ status }) => {
        if (status === "granted") {
          return this.obtenerCoordenadas();
        }

        this.setState(() => ({ status }));
      })
      .catch(error => {
        console.warn("Error getting Location permission: ", error);

        this.setState(() => ({ status: "undetermined" }));
      });
  }
  obtenerCoordenadas = async () => {
    Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        timeInterval: 1,
        distanceInterval: 1
      },
      ({ coords }) => {
        const { latitude, longitude } = coords;
        this.setState(() => ({
          COORDENADASGPS: [latitude, longitude],
          status: "granted"
        }));
      }
    );
  };
  snap = async (camera, cb) => {
    this.setState({ camaraCargando: true }, async () => {
      if (camera) {
        let imagen = await camera.takePictureAsync({
          base64: true,
          quality: 0.5
        });
        this.setImagen(imagen.base64);
      }
    });
  };
  guardarVisita = () => {
    const { errorMessage, status, mostrarCamara, ...rest } = this.state;
  };
  render() {
    let coordenadas = "cargando..";
    if (this.state.errorMessage) {
      coordenadas = this.state.errorMessage;
    } else if (this.state.COORDENADASGPS) {
      coordenadas = JSON.stringify(this.state.COORDENADASGPS);
    }
    return this.state.mostrarCamara ? (
      <Camara snap={this.snap} isLoading={this.state.camaraCargando} />
    ) : (
      <Container>
        <Content>
          <Form>
            <Item>
              <DatePicker
                defaultDate={new Date()}
                minimumDate={new Date()}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"Fecha para la visita"}
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={this.setFechaVisita}
              />
              <Text>
                Fecha Tarea: {this.state.FECHAVISITA.toString().substr(4, 12)}
              </Text>
            </Item>
            <Item>
              <Item stackedLabel>
                <Label>Logro de la Visita</Label>
                <Input
                  multiline
                  value={this.state.LOGROSVISITA}
                  onChangeText={this.setLogroVisita}
                  width={300}
                />
              </Item>
            </Item>
            <Item>
              <DatePicker
                defaultDate={new Date()}
                minimumDate={new Date()}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"Fecha para la visita"}
                textStyle={{ color: "green" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={this.setFechaProximaVisita}
              />
              <Text>
                Fecha Tarea:
                {this.state.FECHAPROXIMAVISITA.toString().substr(4, 12)}
              </Text>
            </Item>
            <Item disabled>
              <Input
                disabled
                placeholder="Coordenadas"
                value={JSON.stringify(this.state.COORDENADASGPS)}
              />
            </Item>
            <Button
              success
              full
              onPress={() => this.setState({ mostrarCamara: true })}
            >
              Tomar foto
            </Button>
            <Item style={{ justifyContent: "space-around" }}>
              {this.state.IMAGENES.map(imagen => (
                <Thumbnail
                  key={imagen}
                  large
                  square
                  source={{
                    uri: imagen
                      ? `data:image/jpg;base64,${imagen}`
                      : "../../assets/imagen-placeholder.jpg"
                  }}
                />
              ))}
            </Item>
            <Button success full onPress={this.guardarVisita}>
              Guardar Visita
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
