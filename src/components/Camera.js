import React from "react";
import { Text, View, TouchableOpacity, Modal } from "react-native";
import { Icon, Spinner } from "native-base";
import { Camera, Permissions } from "expo";

export class Camara extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }
  componentWillUnmount() {
    this.setState({
      hasCameraPermission: null,
      type: Camera.Constants.Type.back
    });
  }
  render() {
    const { hasCameraPermission, type } = this.state;
    const { isLoading, snap } = this.props;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return (
        <Text>No tiene acceso a la camera porfavor revise sus permisos.</Text>
      );
    } else {
      return (
        <Modal
          animationType="slide"
          onRequestClose={() => {}}
          transparent
          visible={this.props.mostrarCamara}
        >
          <View
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              position: "relative",
              flex: 1,
              justifyContent: "center"
            }}
          >
            <Camera
              style={{ flex: 1 }}
              type={type}
              ref={ref => {
                this.camera = ref;
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  flexDirection: "row"
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignSelf: "flex-end",
                    alignItems: "center"
                  }}
                  onPress={() => snap(this.camera)}
                >
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <Icon
                      name="ios-camera"
                      style={{ fontSize: 100, color: "white" }}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
        </Modal>
      );
    }
  }
}
